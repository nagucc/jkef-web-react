import { wxentJkefConfig as wxcfg } from '../../config';
import { Router } from 'express';
import AcceptorManager from './model.js';
import wxapi from '../wx-ent/model';

const router = new Router();
var AM = new AcceptorManager();

var search = async (req, res, next) => {
	var text = req.params.text || '';
	var page = req.query.page || 0;
	var size = req.query.size || 20;
	AM.search(text, {_id:1, name: 1, isMale: 1, phone: 1, idCard:1}, (err, acceptors) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: acceptors});
	}, page*size, size);
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
		acceptor.dateCreated = Date.now();
		try {
			res.send({ret:0, data: await AM.create(acceptor)});
		} catch (e) {
			res.status(500).send(e);
		}
	});


// 必须放在最后匹配
router.get('/:id', (req, res, next) => {
	AM.findById(req.params.id, (err, result) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: result});
	});
});

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

export default router;