import {MongoClient} from 'mongodb';
import {ynu_mongo_url as url, GdzcXlsTitles} from '../../config';

const RAW_COLLECTION = 'gdzc_raw';

const useRaw = async cb => {
  let db = await MongoClient.connect(url);
  let col = db.collection(RAW_COLLECTION);
  let result = await cb(col, db);
  db.close();
  return result;
};

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
    return new Promise(async (resolve, reject) => {
      if(!xls.sheet) reject('xls have not been loaded yet.');

      let db = await MongoClient.connect(url);
      let col = db.collection(RAW_COLLECTION);

      let range = xls.range();
      let promises = [];
      let rowIndex = 0;
      while (++rowIndex <= range.e.r) {
        var rowData = xls.getRowData(rowIndex);
        let filter = {};
        filter[GdzcXlsTitles.Bqh] = rowData[GdzcXlsTitles.Bqh];
        promises.push(col.updateOne(filter, {$set: rowData}, {upsert: true}));
      }
      Promise.all(promises).then(() => {
        db.close();
        resolve();
      });
    });
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
}
