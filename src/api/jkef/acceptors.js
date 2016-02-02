import { wxentAdminConfig as wxcfg, redisConfig as redis } from '../../config';
import { Router } from 'express';
import API from 'wxent-api-redis';
import uuid from 'node-uuid';
import errmsg from 'wx-errmsg';
import AcceptorManager from './model.js';

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

// 确保传递过来的数据中姓名和
var checkBodyData = async (req, res, next) => {
	if(!req.body.name || !req.body.phone){
		res.send({ret: -1, msg: '姓名和手机号不能为空'});
		return;
	}
	next();
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
router.put('/', checkBodyData, async (req, res, next) => {
	console.log(req.body);
	if(!req.body.name || !req.body.phone){
		res.send({ret: -1, msg: '姓名和手机号不能为空'});
		return;
	}
	res.send({ret:0});
});


// 必须放在最后匹配
router.get('/:id', (req, res, next) => {
	AM.findById(req.params.id, (err, result) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: result});
	});
});

// 修改信息
router.post('/:id', checkBodyData, (req, res, next) => {

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
	AM.update(req.params.id, updateData, (err, result) => {
		if(err) res.status(500).send(err);
		else res.send({ret: 0, data: result});
	});
});

export default router;