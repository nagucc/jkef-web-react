
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

    // 记录
    records: [{
        _id: Schema.Types.ObjectId,
        date: Date,
        project:String,
        amount: Number,
        recommander: String,
        remark:String
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
        Acceptor.find({}, projections, cb).sort({name: 1}).skip(skip).limit(limit);
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

    findById(id, cb) {
        Acceptor.findById(id, cb);
    }

    /*
    按年度进行统计
    */
    statByYear(cb) {
        Acceptor.mapReduce({
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
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
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
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
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
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



    remove(id, cb) {
        Acceptor.findByIdAndRemove(id, cb);
    }

    search(text, projections, cb, skip = 0, limit = 20) {
        var reg = new RegExp(text);
        var condition = {
            $or: [{ name: reg }, {phone: reg}]
        };
        Acceptor.find(condition, projections, cb).skip(skip).limit(limit);
    }

    count(text, cb){
        var condition = {};
        if(text){
            var reg = new RegExp(text);
            condition = {
                $or: [{ name: reg }, {phone: reg}]
            }
        }
        Acceptor.count(condition, cb);
    }
}

module.exports = AcceptorManager;