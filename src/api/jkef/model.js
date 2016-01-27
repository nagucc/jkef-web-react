
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
        Acceptor.find({}, projections, cb).skip(skip).limit(limit);
    }
z
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

    findById(id, cb) {
        Acceptor.findById(id, cb);
    }

    statByYear(cb) {
        Acceptor.mapReduce({
            map: function () {
                if(this.records){
                    this.records.forEach(function (record) {
                        emit({ 
                            project: record.project,
                            year: record.date.getYear() + 1900
                        }, {
                            amount: record.amount,
                            count: 1
                        });
                    });
                }
            },
            reduce: function (key, values) {
                return {
                    amount: Array.sum(values),
                    count: values.length
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