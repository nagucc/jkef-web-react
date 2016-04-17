import {MongoClient} from 'mongodb';
import {ynu_mongo_url as url, GdzcXlsTitles,
  gdzc_dxsb_yz} from '../../config';

/**
 * 用于保存原始数据的集合的名称
 * @type {String}
 */
const RAW_COLLECTION = 'gdzc_raw';
const MODEL_COLLECTION = 'gdzc_model';
const STAT_BY_YEAR_COLLECTION = 'gdzc_statByYear';
const STAT_BY_LYR_COLLECTION = 'gdzc_statByLyr';



const useCollection = async (collectionName, cb) => {
  let db = await MongoClient.connect(url);
  let col = db.collection(collectionName);
  let result = await cb(col, db);
  db.close();
  return result;
}
/**
 * 使用原始数据集合
 * @type {Function}
 */
const useRaw = cb => useCollection(RAW_COLLECTION, cb);

const useModel = cb => useCollection(MODEL_COLLECTION, cb);

const useStatByYear = cb => useCollection(STAT_BY_YEAR_COLLECTION, cb);

const useStatByLyr = cb => useCollection(STAT_BY_LYR_COLLECTION, cb);

const insertIfNotExists = async (col, rowData) => {
  let zc = await col.findOne({Bqh: rowData[GdzcXlsTitles.Bqh]});
  if(zc)
    return col.findOneAndUpdate({Bqh: rowData[GdzcXlsTitles.Bqh]}, {
      $push: {log: {text: '重新导入数据', date: new Date()}}
    });
  else {
    let doc = Object.assign({},
      // 插入所有原始值
      {...rowData},

      // 插入日志
      {
        log: [{
          text: '初始化数据',
          date: new Date()
        }]
      },
      // 为了便于使用mapReduce进行统计，将需要map的字段使用固定字段进行存放。
      {
        // 标签号
        Bqh: rowData[GdzcXlsTitles.Bqh],
        // 原值
        Yz: rowData[GdzcXlsTitles.Yz],
        // 购置日期的年份字段
        GzrqYear: rowData[GdzcXlsTitles.Gzrq].getFullYear(),
        // 使用年限
        Synx: rowData[GdzcXlsTitles.Synx],
        // 单价
        Dj: rowData[GdzcXlsTitles.Dj],
        // 状态，默认为使用中
        Status: GdzcModel.Status.USING
      });
    return col.insertOne(doc);
  }
}
/**
 * 管理固定资产数据库的类
 */
export default class GdzcModel {

  static Status = {
    USING: 1,
    SCRAPING: 9
  };

  /**
   * 合并xls数据到数据库中
   * @param  {GdzcXls} xls xls数据类，输入之前必须先加载数据。
   * @return {Promise}
   */
  async merge (xls) {
    if(!xls.sheet) return Promise.reject('GdzcXls object has not been loaded yet.');

    let range = xls.range();
    return useRaw(colRaw => useModel(colModel => {
      let rowIndex = 0;
      let promises = [];
      while (++rowIndex <= range.e.r) {
        var rowData = xls.getRowData(rowIndex);
        let filter = {};
        filter[GdzcXlsTitles.Bqh] = rowData[GdzcXlsTitles.Bqh];
        promises.push(
          // 用xls数据逐条替换raw数据库中的数据
          colRaw.updateOne(
            filter,
            {$set: rowData},
            {upsert: true}
          ),
          // 如果是第一次导入，则初始化model数据
          insertIfNotExists(colModel, rowData)
        );
      }
      return Promise.all(promises);
    }));
  }

  /**
   * 根据标签号查找固定资产数据
   * @param  {String} bqh 标签号
   * @return {Array}     固定资产数据列表
   */
  async findByBqh(bqh) {
    let filter = {};
    filter[GdzcXlsTitles.Bqh] = bqh;
    return useRaw(async col => (await col.findOne(filter)));
  }

  /**
   * 根据领用人名称获取固定资产列表
   * @param  {String} lyr 领用人名称
   * @return {Promise}     固定资产列表
   */
  async findByLyr(lyr) {
    let filter = {};
    filter[GdzcXlsTitles.Lyr] = lyr;
    return useRaw(async col => await col.find(filter).toArray());
  }

  /**
   * 根据管理人名称获取固定资产列表
   * @param  {String} glr   管理人名称
   * @return {Promise}      固定资产列表
   */
  async findByGlr(glr) {
    let filter = {};
    filter[GdzcXlsTitles.Glr] = glr;
    return useRaw(async col => await col.find(filter).toArray());
  }

  /**
   * 获取现有领用人列表
   * @return {Promise} 领用人名称列表
   */
  async getLyrs() {
    return await useStatByLyr(async col => await col.distinct('_id'));
  }

  /**
   * 获取现有管理人列表
   * @return {Promise} 管理人名称列表
   */

  async getGlrs() {
    return await useRaw(async col => await col.distinct(GdzcXlsTitles.Glr));
  }

  async count() {
    return useModel(col => col.count());
  }

  async amount() {
    return new Promise((resolve, reject) => {
      useStatByYear(async col => {
        let result = await col.aggregate([{
          $group: {
            _id: new Date(),
            amount: {$sum: '$value.amount'}
          }
        }]).next();
        resolve(result.amount);
      })
    })
  }

  async dxsbTotalStat() {
    return new Promise((resolve, reject) => {
      useStatByYear(async col => {
        let result = await col.find().toArray();
        let dxsbAmount = 0, dxsbCount = 0;
        result.forEach(doc => {
          dxsbAmount += doc.value.dxsbAmount;
          dxsbCount += doc.value.dxsbCount;
        });
        resolve({ dxsbAmount, dxsbCount});
      });
    })
  }

  async statByYear() {
    return useStatByYear(col => col.find().toArray());
  }

  async statByLyr() {
    return useStatByLyr(col => col.find().toArray());
  }

  async scrapingTotalStat() {
    return new Promise((resolve, reject) => {
      useStatByYear(async col => {
        let result = await col.find().toArray();
        let scrapingAmount = 0, scrapingCount = 0;
        result.forEach(doc => {
          scrapingAmount += doc.value.scrapingAmount;
          scrapingCount += doc.value.scrapingCount;
        });
        resolve({ scrapingAmount, scrapingCount});
      });
    })
  }

  async search(options) {
    options = Object.assign({
      text: '',
      year: 0,
      lyr: '',
      glr:'',
      onlyScraping: false,
      onlyDxsb : false,
      start: 0
    },options);
    let {year, lyr, glr, onlyScraping, onlyDxsb, start, text} = options;
    let query = {};
    if(text.trim().length > 0) {
      let reg = new RegExp(text.trim());
      Object.assign(query, {
        $or: [{
          '设备名称': reg
        }, {
          Bqh: reg
        }]
      });
    }

    if(year > 0) Object.assign(query, {GzrqYear: parseInt(year)})
    if(lyr.trim().length > 0) {
      let reg = new RegExp(lyr.trim());
      query[GdzcXlsTitles.Lyr] = reg;
    }
    if(glr.trim().length > 0) {
      let reg = new RegExp(glr.trim());
      query[GdzcXlsTitles.Glr] = reg;
    }
    if(onlyScraping) {
      Object.assign(query, {
        Status: GdzcModel.Status.SCRAPING
      });
    }
    if(onlyDxsb) {
      Object.assign(query, {
        Yz: {$gte: gdzc_dxsb_yz}
      })
    }
    return useModel(col => (col.find(query).project({

    }).skip(parseInt(start)).limit(20).toArray()));
  }

  /*
  按年统计固定资产的数量和金额
   */
  async computeStatByYear() {
    let map = function() {
      let year = this.GzrqYear;
      var thisYear = (new Date()).getYear() + 1900;
      emit(year, {
        amount: this.Yz,
        count: 1,
        dxsbAmount: this.Yz >= 100000 ? this.Yz : 0,
        dxsbCount: this.Yz >= 100000 ? 1 : 0,
        scrapingAmount: this.GzrqYear + this.Synx < thisYear ? this.Yz : 0,
        scrapingCount: this.GzrqYear + this.Synx < thisYear ? 1 : 0
      });
    }
    let reduce = function(key, values) {
      let amount = 0, count = 0, dxsbAmount = 0, dxsbCount = 0;
      let scrapingCount = 0, scrapingAmount = 0;
      values.forEach(val => {
        amount += val.amount;
        count += val.count;
        dxsbAmount += val.dxsbAmount;
        dxsbCount += val.dxsbCount;
        scrapingAmount += val.scrapingAmount;
        scrapingCount += val.scrapingCount;
      });
      return {amount, count, dxsbAmount, dxsbCount,
        scrapingCount, scrapingAmount
      };
    }
    return useModel(col => col.mapReduce(map, reduce, {
        out: {replace: STAT_BY_YEAR_COLLECTION}
    }));
  }


  async computeScrapping () {
    return new Promise((resolve, reject) => {
      useModel(async col => {
        try{
          var cursor = col.find({
            'Status': GdzcModel.Status.USING,
            $where: function(){
              var thisYear = (new Date()).getYear() + 1900;
              return this.GzrqYear + this.Synx < thisYear;
            }
          });
          while (await cursor.hasNext()) {
            let doc = await cursor.next();
            await col.findOneAndUpdate({_id: doc._id}, {
              $set: {Status: GdzcModel.Status.SCRAPING}
            });
          }
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    });
  }

  async computeStatByLyr() {
    let map = function() {
      let year = this.GzrqYear;
      var thisYear = (new Date()).getYear() + 1900;
      emit(this['领用人'], {
        amount: this.Yz,
        count: 1,
        dxsbAmount: this.Yz >= 100000 ? this.Yz : 0,
        dxsbCount: this.Yz >= 100000 ? 1 : 0,
        scrapingAmount: this.GzrqYear + this.Synx < thisYear ? this.Yz : 0,
        scrapingCount: this.GzrqYear + this.Synx < thisYear ? 1 : 0
      });
    }
    let reduce = function(key, values) {
      let amount = 0, count = 0, dxsbAmount = 0, dxsbCount = 0;
      let scrapingCount = 0, scrapingAmount = 0;
      values.forEach(val => {
        amount += val.amount;
        count += val.count;
        dxsbAmount += val.dxsbAmount;
        dxsbCount += val.dxsbCount;
        scrapingAmount += val.scrapingAmount;
        scrapingCount += val.scrapingCount;
      });
      return {amount, count, dxsbAmount, dxsbCount,
        scrapingCount, scrapingAmount
      };
    }
    return useModel(col => col.mapReduce(map, reduce, {
        out: {replace: STAT_BY_LYR_COLLECTION}
    }));
  }

  async createIndexes() {

    // 为Raw集合创建索引
    var indexesForRaw = useRaw(col => col.createIndexes([
      // Bqh 字段的索引
      {
        key: { Bqh: 1 },
        name: 'Index for Bqh'
      },
      // '设备名称'字段的索引
      {
        key: {'设备名称': 1},
        name: 'Index for sbmc'
      },
      // '领用人'字段索引
      {
        key: {'领用人': 1},
        name: 'Index for lyr'
      }
    ]));

    // 为Model集合创建索引
    var indexesForModel = useModel(col => col.createIndexes([
      // Bqh 字段的索引
      {
        key: { Bqh: 1 },
        name: 'Index for Bqh'
      },
      // '设备名称'字段的索引
      {
        key: {'设备名称': 1},
        name: 'Index for sbmc'
      },
      // '领用人'字段索引
      {
        key: {'领用人': 1},
        name: 'Index for lyr'
      },
      // search所用字段的索引
      {
        key: {
          Bqh: 1,
          '设备名称': 1,
          '领用人': 1,
          '管理人': 1,
          Status: 1,
          Yz: 1,
          _id: 1
        },
        name: 'Index for search'
      }
    ]));

    return Promise.all(indexesForRaw, indexesForModel);
  }
}
