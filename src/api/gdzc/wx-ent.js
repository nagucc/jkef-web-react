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
  var url = wxapi.getAuthorizeURL(`http://gdzc.nagu.cc/api/gdzc-wx-ent/wxback`, '', 'snsapi_base');
  console.log(url);
  res.send(url);
});

router.get('/wxback', (req, res, next) => {
  res.send('back：', req.query.code);
})

export default router;
