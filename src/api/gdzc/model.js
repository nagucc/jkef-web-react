import {MongoClient} from 'mongodb';
import {ynu_mongo_url as url, GdzcXlsTitles} from '../../config';

/**
 * 用于保存原始数据的集合的名称
 * @type {String}
 */
const RAW_COLLECTION = 'gdzc_raw';
const MODEL_COLLECTION = 'gdzc_model';
const STAT_BY_YEAR_COLLECTION = 'gdzc_statByYear';

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
        // 原值
        Yz: rowData[GdzcXlsTitles.Yz],
        // 购置日期的年份字段
        GzrqYear: rowData[GdzcXlsTitles.Gzrq].getFullYear(),
        // 使用年限
        Synx: rowData[GdzcXlsTitles.Synx],
        // 单价
        Dj: rowData[GdzcXlsTitles.Dj]
      });
    return col.insertOne(doc);
  }
}
/**
 * 管理固定资产数据库的类
 */
export default class GdzcModel {

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
    let zcs = await useRaw(async col => await col.distinct(GdzcXlsTitles.Lyr));
    return zcs.map(zc => {
      return zc[GdzcXlsTitles.Lyr];
    });
  }

  /**
   * 获取现有管理人列表
   * @return {Promise} 管理人名称列表
   */

  async getGlrs() {
    let zcs = await useRaw(async col => await col.distinct(GdzcXlsTitles.Glr));
    return zcs.map(zc => {
      return zc[GdzcXlsTitles.Glr];
    });
  }

  async count() {
    return useModel(col => col.count());
  }

  async amount() {
    return new Promise((resolve, reject) => {
      useModel(async col => {
        let result = await col.aggregate([{
          $group: {
            _id: new Date(),
            amount: {$sum: '$'+GdzcXlsTitles.Yz}
          }
        }]).next();
        resolve(result.amount);
      });
    })
  }

  async statByYear() {
    return useStatByYear(col => col.find().toArray());
  }

  async computeStatByYear() {
    let map = function() {
      let year = this.GzrqYear;
      emit(year, {
        amount: this.Yz,
        count: 1
      });
    }
    let reduce = function(key, values) {
      let amount = 0, count = 0;
      values.forEach(val => {
        amount += val.amount;
        count += val.count;
      });
      return {amount, count};
    }
    return useModel(col => col.mapReduce(map, reduce, {
        out: {replace: STAT_BY_YEAR_COLLECTION}
    }));
  }
  // 
  // async computeScrappingByYear () {
  //   let map = function () {
  //     emit(this.GzrqYear + , )
  //   }
  // }
}
