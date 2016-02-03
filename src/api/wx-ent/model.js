/*
微信企业号api
*/

import { wxentAdminConfig as wxcfg, redisConfig as redis } from '../../config';
import API from 'wxent-api-redis';
import uuid from 'node-uuid';
import errmsg from 'wx-errmsg';

const wxapi = API(wxcfg.corpId, wxcfg.secret, wxcfg.agentId, redis.host, redis.port);

var createUser = async (name, mobile, depts) => {
	return new Promise(function (resolve, reject) {
		wxapi.createUser({
			userid: 'self_register_' + uuid.v4().replace(/-/g, ''),
			name: name,
			mobile: mobile,
			department: depts
		}, (err, result) => {
			if(err) {
				if(err.name === 'WeChatAPIError')
					reject({ret: err.code, msg: errmsg[err.code.toString()]});
				else
					reject(err);
			} 
			else resolve(result);
		});
	})
};

export default {
	createUser: createUser
};