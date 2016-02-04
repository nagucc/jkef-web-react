import { wxentJkefConfig as wxcfg } from '../../config';
import { Router } from 'express';
import AcceptorManager from './model.js';
import wxapi from '../wx-ent/model';
import moment from 'moment';

const router = new Router();
var AM = new AcceptorManager();

var search = async (req, res, next) => {
	var text = req.params.text || '';
	var page = req.query.page || 0;
	var size = req.query.size || 20;
	try {
		res.send({
			ret: 0,
			data: await AM.search(text, {
				_id:1, name: 1, isMale: 1, phone: 1, idCard:1
			}, page*size, size)
		});
	} catch(e) {
		res.status(500).send(e);
	}
};

// 确保传递过来的数据中姓名和电话不为空
var checkBodyData = async (req, res, next) => {
	if(!req.body.name || !req.body.phone){
		res.status(500).send('姓名和手机号不能为空');
		return;
	}
	next();
};


// 确保用户已登录
var ensureUserLogged= async (req, res, next) => {
	req.userId = req.signedCookies.userId;
	if(req.userId) next();
	else res.status(403).send('用户未登录');
};

router.get('/search', search);
router.get('/search/:text', search);


var getCount = async (req, res, next) => {
	var text = req.params.text || '';
	AM.count(text, (err, count) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: count});
	});
};

router.get('/count/:text', getCount);
router.get('/count', getCount);

// 新增受赠人信息
router.put('/', 
	ensureUserLogged, 
	checkBodyData, 
	async (req, res, next) => {
		var acceptor = req.body;
		acceptor.createBy = req.userId;
		try {
			res.send({ret:0, data: await AM.create(acceptor)});
		} catch (e) {
			res.status(500).send(e);
		}
	});

router.get('/test', async (req, res, next) => {
	try {
		res.send({
			data: await AM.removeRecord(1,2)
		});
	} catch(e) {
		console.log('err777');
		res.send(e);
	}
});

// 必须放在最后匹配
router.get('/:id', async (req, res, next) => {
	try {
		res.send({
			ret: 0,
			data: await AM.findById(req.params.id)
		});
	} catch(e) {
		res.status(500).send(e);
	}
});

router.delete('/:id', async (req, res, next) =>{
	try {
		res.send({
			ret: 0,
			data: await AM.remove(req.params.id)
		});
	} catch(e) {
		res.status(500).send(e);
	}
})

// 修改信息
router.post('/:id', 
	ensureUserLogged,
	checkBodyData, 
	async (req, res, next) => {
		var updateData = {
			name: req.body.name,
			homeAddress: req.body.homeAddress,
			phone: req.body.phone,
			isRecommander: req.body.isRecommander,
			isMale: req.body.isMale,
			nagu_wxent_userId: req.body.nagu_wxent_userId,
			idCard: req.body.idCard,
			highSchool: req.body.highSchool,
			bachelorSchool: req.body.bachelorSchool,
			masterSchool: req.body.masterSchool,
			doctorSchool: req.body.doctorSchool
		};
		try {
			var result = await AM.update(req.params.id, updateData);
			res.send({ret: 0, data: result})
		} catch(e) {
			res.status(500).send(err);
		}
	});


/*
受赠记录管理
*/

/*
对客户端输入对受赠记录数据进行验证
- project 项目不能为空。
- date 日期格式不能有错
- amount 金额
	1. 金额格式不能出错
	2. 金额最多精确到小数点后两位
*/
var checkRecord = (req, res, next) => {
	if(!req.body.project){ 
		res.status(500).send('项目不能为空');
		return;
	}
	try {
		var date = moment(req.body.date);
		if(date.isValid()) req.body.date = date.toDate();
		else {
			res.status(500).send('错误的日期格式');
			return;
		}

		var amount = Math.round(parseFloat(req.body.amount)*100);
		if(isNaN(amount) || amount !== parseFloat(req.body.amount)*100) {
			res.status(500).send('错误的金额格式');
			return;
		} else
			req.body.amount = amount * 10;
	} catch(e) {
		res.status(500).send(e);
	}
	next();
};

// 添加受赠记录
router.put('/:acceptorId/records',
	ensureUserLogged,
	checkRecord,
	async (req, res, next) => {
		var acceptorId = req.params.acceptorId;
		var record = req.body;
		record.createBy = req.userId;
		try {
			res.send({ret: 0, data: await AM.createRecord(acceptorId, record)});
		} catch(e) {
			res.status(500).send(e);
		}
	});

router.delete('/:acceptorId/records/:id', 
	ensureUserLogged,
	async (req, res, next) => {
		if(acceptorId == 'undefined') acceptorId = '';
		var acceptorId = req.params.acceptorId;
		var recordId = req.params.id;
		try {
			res.send({
				ret: 0,
				data: await AM.removeRecord(acceptorId, recordId)
			});
		} catch(e) {
			console.log(e);
			res.status(500).send(e);
		}
	});








export default router;