import { Router } from 'express';
import AcceptorManager from './model.js';

const router = new Router();
var AM = new AcceptorManager();

var search = async (req, res, next) => {
	var text = req.params.text || '';
	var page = req.query.page || 0;
	var size = req.query.size || 20;
	AM.search(text, {_id:1, name: 1, isMale: 1, phone: 1, idCard:1 }, (err, acceptors) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: acceptors});
	}, page*size, size);
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


// 必须放在最后匹配
router.get('/:id', (req, res, next) => {
	AM.findById(req.params.id, (err, result) => {
		if(err) res.send({ret: -1, msg: err});
      	else res.send({ret: 0, data: result});
	});
});

export default router;