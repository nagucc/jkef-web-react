import {MongoClient} from 'mongodb';
import {ynu_mongo_url as url} from '../../config';

export default class GdzcModel {
  async merge (xls) {
    return new Promise(async (resolve, reject) => {
      if(!xls.sheet) reject('xls have not been loaded yet.');

      let db = await MongoClient.connect(url);
      let col = db.collection('gdzc_raw');

      let range = xls.range();
      let promises = [];
      let rowIndex = 0;
      while (++rowIndex <= range.e.r) {
        var rowData = xls.getRowData(rowIndex);
        promises.push(col.updateOne({'标签号':rowData['标签号']}, {$set: rowData}, {upsert: true}));
      }
      Promise.all(promises).then(() => {
        db.close();
        resolve();
      });
    });
  }

  async findByBqh(bqh) {
    let db = await MongoClient.connect(url);
    let col = db.collection('gdzc_raw');
    let zc = await col.findOne({'标签号':bqh});
    db.close();
    return zc;
  }

  async findByLyr(lyr) {
    let db = await MongoClient.connect(url);
    let col = db.collection('gdzc_raw');
    let zcs = await col.find({'领用人':lyr}).toArray();
    db.close();
    return zcs;
  }

  async findByGlr(glr) {
    let db = await MongoClient.connect(url);
    let col = db.collection('gdzc_raw');
    let zcs = await col.find({'管理人':glr}).toArray();
    db.close();
    return zcs;
  }

  async getLyrs() {
    let db = await MongoClient.connect(url);
    let col = db.collection('gdzc_raw');
    let zcs = await col.distinct('领用人');
    db.close();
    return zcs.map(zc => {
      return zc['领用人'];
    });
  }

  async getGlrs() {
    let db = await MongoClient.connect(url);
    let col = db.collection('gdzc_raw');
    let zcs = await col.distinct('管理人');
    db.close();
    return zcs.map(zc => {
      return zc['管理人'];
    });
  }
}
