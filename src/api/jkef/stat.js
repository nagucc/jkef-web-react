import { Router } from 'express';
import AcceptorManager from './model.js';

const router = new Router();
var AM = new AcceptorManager();

router.get('/year', async (req, res, next) => {
	AM.statByYear((err, result) => {
		if (err) { 
			res.send({ret: -1, msg: err});
		} else {
			res.send({ret: 0, data: result});
		};
	});
});


router.get('/project', async (req, res, next) => {
	AM.statByProject((err, result) => {
		if (err) { 
			res.send({ret: -1, msg: err});
		} else {
			res.send({ret: 0, data: result});
		};
	});
});

router.get('/year-project', async (req, res, next) => {
	AM.statByYearAndProject((err, result) => {
		if (err) { 
			res.send({ret: -1, msg: err});
		} else {
			res.send({ret: 0, data: result});
		};
	});
});

export default router;
