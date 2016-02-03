/*
使用基于微信企业号的用户认证
*/

import { wxentSignupConfig as wxcfg } from '../../config';
import { Router } from 'express';
import wxapi from './model';

const router = new Router();

router.post('/', async (req, res, next) => {
	try {
		var result = await wxapi.createUser(req.body.name, req.body.mobile, [wxcfg.newUserDptId]);
		res.send({ret: 0, data: result});
	} catch (e) {
		res.send(e);
	}
});


export default router;

