
// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;
import mongoose, {Schema} from 'mongoose';

// 基金会受助人信息
var jkefRecordSchemaObject = {

    // 姓名
    name: String,

    // 高中
    highSchool: {
        name: String,
        admissionYear: Number
    },

    // 大学
    bachelorSchool: {
        name: String,
        major: String,
        admissionYear: Number
    },

    // 硕士
    masterSchool: {
        name: String,
        major: String,
        subject: String,
        admissionYear: Number
    },

    // 博士
    doctorSchool: {
        name: String,
        major: String,
        subject: String,
        admissionYear: Number
    },

    // 工作单位
    company: {
        name: String,       // 单位名称
        title: String       // 职称／职务
    },

    // 家庭住址
    homeAddress:String,

    // 联系电话
    phone:String,

    // 是否是推荐人
    isRecommander: Boolean,

    // 证件
    idCard: {
        category: String,   // 类型，身份证或组织机构代码证
        number: String   // 号码
    },

    // 性别
    isMale: Boolean,

    // 微信企业号Id
    wxent_UserIds: [{
        corpName: String,
        coprId: String,
        userId: String
    }],

    // 此人在纳谷社区微信企业号的Id
    nagu_wxent_userId: String,

    // 创建者
    createBy: String,

    // 创建时间
    dateCreated: Date,

    // 标记是否该记录已被删除
    isDeleted: Boolean,

    // 记录
    records: [{
        _id: Schema.Types.ObjectId,
        date: Date,
        project:String,
        amount: Number,
        recommander: String,
        remark:String,
        isDeleted: Boolean,
        createBy: String,
        dateCreated: Date
    }]
};

var schema = new Schema(jkefRecordSchemaObject);
mongoose.model('Acceptor', schema);
var Acceptor = mongoose.model('Acceptor');

class AcceptorManager {
    constructor(options) {
        this.mgoptions = options;
    }

    /*
    列出所有Acceptor。
    参数：
        - projections. 投影选项。
        - [option] 可选的，相关参数：
            - skip 
            - limit
        - cb. 回调函数
    example:
    AM.list({_id:1, name: 1, isMale: 1, phone: 1, idCard:1 },(err, acceptors) => {
      if(err) res.send({ret: -1, msg: err});
      else res.send({ret: 0, data: acceptors});
    });
    */
    list(projections, cb, skip = 0, limit = 20) {
        Acceptor.find({isDeleted: { $ne: true}}, projections, cb).sort({name: 1}).skip(skip).limit(limit);
    }

    upsert(acceptor, cb) {
        if(acceptor instanceof Acceptor){
            if(acceptor._id) {                  // _id已存在，更新文档
                var id = acceptor._id;
                var upsertData = acceptor.toObject();
                delete upsertData._id;
                Acceptor.update({_id: id}, upsertData, {upsert: true}, cb);
            } else acceptor.save(cb);
        } else {
            cb('acceptor must be a instance of Acceptor model.');
        }
    }

    /*
    创建一个受助者
    */
    async create(acceptor) {
        acceptor.isDeleted = false;
        acceptor.dateCreated = Date.now();
        return new Promise((resolve, reject) => {
            Acceptor.create(acceptor, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    async update(id, data, cb) {
        return new Promise((resolve, reject) => {
            Acceptor.update({_id: id}, data, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    async remove(id) {
      return new Promise((resolve, reject) => {
        Acceptor.update({_id: id}, {
          $set: {isDeleted: true}
        }, (err, result) => {
          if(err) reject(err);
          else resolve(result);
        });
      });
    }

    async createRecord(id, record) {
        record.dateCreated = Date.now();
        record.isDeleted = false;
        record._id = new mongoose.Types.ObjectId;
        return new Promise((resolve, reject) => {
            Acceptor.update({_id: id}, {
                $push: {records: record}
            }, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    async removeRecord(acceptorId, recordId) {
        return new Promise((resolve, reject) => {
          Acceptor.update({
            _id: acceptorId, 'records._id': recordId
          }, {
            $set: {'records.$.isDeleted': true}
          }, (err, result) => {
            if(err) reject(err);
            else resolve(result);
          });
        });
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            Acceptor.findById(id, (err, result) => {
                if(result && result.records) {
                    result.records = result.records.filter(rec => {
                        return !rec.isDeleted;
                    });
                }
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    /*
    按年度进行统计
    */
    statByYear(cb) {
        Acceptor.mapReduce({
            query: {isDeleted: { $ne: true}},
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
                        if(record.isDeleted) return;
                        emit(record.date.getYear() + 1900, {
                            amount: record.amount / 1000,
                            count: 1
                        });
                    });
                }
            },
            reduce: function (key, values) {
                var amount = 0, count = 0;
                values.forEach((val)=>{
                    amount += val.amount;
                    count += val.count;
                });
                return {
                    amount: amount,
                    count: count
                };
            }
        }, cb);
    }

    /*
    按项目分组进行统计

    */
    statByProject(cb) {
        Acceptor.mapReduce({
            query: {isDeleted: { $ne: true}},
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
                        if(record.isDeleted) return;
                        emit(record.project, {
                            amount: record.amount / 1000,
                            count: 1
                        });
                    });
                }
            },
            reduce: function (key, values) {
                var amount = 0, count = 0;
                values.forEach((val)=>{
                    amount += val.amount;
                    count += val.count;
                });
                return {
                    amount: amount,
                    count: count
                };
            }
        }, cb);
    }

    /*
    按年度和项目分组进行统计

    */
    statByYearAndProject(cb) {
        Acceptor.mapReduce({
            query: {isDeleted: { $ne: true}},
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
                        if(record.isDeleted) return;
                        emit({ 
                            project: record.project,
                            year: record.date.getYear() + 1900
                        }, {
                            amount: record.amount / 1000,
                            count: 1
                        });
                    });
                }
            },
            reduce: function (key, values) {
                var amount = 0, count = 0;
                values.forEach((val)=>{
                    amount += val.amount;
                    count += val.count;
                });
                return {
                    amount: amount,
                    count: count
                };
            }
        }, cb);
    }

    /*
    查询受赠人
    参数：
    - text 根据姓名／电话查询
    - projections 返回数据的投影
    - skip 跳过前面的记录数
    - limit 最多读取的记录数
    - project 根据受赠项目检索
    - year 根据记录时间检索
    */
    async search(text, projections, skip = 0, limit = 20, project = null, year = null) {
        var condition = { isDeleted: {$ne: true} };
        if(text) {
          var reg = new RegExp(text);
          condition['$or'] = [{ name: reg }, {phone: reg}];
        }
        if(project) {
          condition['records.project'] = project;
        }
        if(year) {
          year = parseInt(year);
          condition['records'] = {
            $elemMatch: {
              date: { 
                $gte: new Date(year, 0, 1),
                $lt: new Date(year + 1, 0, 1)
              }
            }
          }
        }
        return new Promise((resolve, reject) => {
          Acceptor.find(condition, projections, {
            skip: skip,
            limit: limit
          }, (err, result) => {
            console.log(result.length); 
            if(err) reject(err);
            else resolve(result);
          });
        });
        
    }

    async count(text, project, year){
        var condition = {
          isDeleted: {$ne: true},
        };
        if(text){
            var reg = new RegExp(text);
            condition['$or'] = [{ name: reg }, {phone: reg}];
        }
        if(project) {
          condition['records.project'] = project;
        }
        if(year) {
          year = parseInt(year);
          condition['records'] = {
            $elemMatch: {
              date: { 
                $gte: new Date(year, 0, 1),
                $lt: new Date(year + 1, 0, 1)
              }
            }
          }
        }
        return new Promise((resolve, reject) => {
          Acceptor.count(condition, (err, result) => {
            if(err) reject(err);
            else resolve(result);
          });
        });
        
    }
}

module.exports = AcceptorManager;