/*
使用基于微信企业号的用户认证
*/

import { wxentSignupConfig as wxcfg, redisConfig as redis } from '../../config';
import { Router } from 'express';
import API from 'wxent-api-redis';
import uuid from 'node-uuid';
import errmsg from 'wx-errmsg';

const router = new Router();
const wxapi = API(wxcfg.corpId, wxcfg.secret, wxcfg.agentId, redis.host, redis.port);

router.post('/', (req, res, next) => {
	console.log(req.body);
	wxapi.createUser({
		userid: 'self_register_' + uuid.v4().replace(/-/g, ''),
		name: req.body.name,
		mobile: req.body.mobile,
		department: [wxcfg.newUserDptId]
	}, (err, result) => {
		if(err) {
			if(err.name === 'WeChatAPIError')
				res.send({ret: err.code, msg: errmsg[err.code.toString()]});
			else
				console.log('error: ' + JSON.stringify(err));
		} 
		else
			res.send({ret: 0, data: result});
	});
});


export default router;

