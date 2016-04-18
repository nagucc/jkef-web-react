import { wxentConfig as wxcfg, redisConfig as redis, host } from '../../config';
import { Router } from 'express';
import moment from 'moment';
import API from 'wxent-api-redis';
import wxent from 'wechat-enterprise';

import GdzcModel from './model';

const router = new Router();
const gdzc = new GdzcModel();
const wxapi = API(wxcfg.corpId, wxcfg.secret, wxcfg.agentId, redis.host, redis.port);


router.use('/test', async(req, res, next) => {
  var url = wxapi.getAuthorizeURL(`http://gdzc.nagu.cc/api/gdzc-wx-ent/lyr`, 'state', 'snsapi_base');
  console.log(url);
  res.send(url);
});


router.get('/lyr', (req, res, next) => {
  // 使用code获取userId
  wxapi.getUserIdByCode(req.query.code, (err, result) => {
    if(err) {
      res.send({ret: -1, msg: err});
    } else {
      // 用户验证正确，设置用户状态为登录，获取用户姓名，并转向/items?lyr=xx页面
      wxapi.getUser(result.UserId, (err, user) => {
        res.redirect(`http://gdzc.nagu.cc/items?lyr=${user.name}`);
      });
    }
  });
});


// router.use('/', wxent(wxcfg).text((msg, req, res, next) => {
//
// }).middleware());

export default router;
