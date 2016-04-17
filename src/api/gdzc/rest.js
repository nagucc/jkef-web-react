import { wxentJkefConfig as wxcfg, acl_password } from '../../config';
import { Router } from 'express';
import multer from 'multer';
import moment from 'moment';
import passport from 'passport';
import {BasicStrategy} from 'passport-http';

import GdzcModel from './model';
import GdzcXls from './gdzcXls';

const router = new Router();
const gdzc = new GdzcModel();

router.get('/stat/byYear', async (req, res, next) => {
  try {
    res.send({ret:0, data: await gdzc.statByYear()});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get('/stat/byLyr', async (req, res, next) => {
  try {
    res.send({ret:0, data: await gdzc.statByLyr()});
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get('/stat/total', async(req, res, next) => {
  let amountPromise = gdzc.amount();
  let countPromise = gdzc.count();
  let lyrPromise = gdzc.getLyrs();
  let glrPromise = gdzc.getGlrs();
  let dxsbTotalStatPromise = gdzc.dxsbTotalStat();
  let scrapingTotalStatPromise = gdzc.scrapingTotalStat();

  try {
    var result = await Promise.all([amountPromise,
      countPromise,
      lyrPromise,
      glrPromise,
      dxsbTotalStatPromise,
      scrapingTotalStatPromise]);
    res.send({
      ret: 0,
      data: {
        amount: result[0],
        count: result[1],
        lyrs: result[2],
        glrs: result[3],
        ...result[4],
        ...result[5]
      }
    });
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get('/item/:bqh', async(req, res, next) => {
  try {
    res.send({
      ret: 0,
      data: await gdzc.findByBqh(req.params.bqh)
    });
  } catch(e) {
    res.status(500).send(e.stack);
  }
});

router.get('/search', async(req, res, next) => {
  try {
    res.send({
      ret: 0,
      data: await gdzc.search(req.query)
    });
  } catch(e) {
    res.status(500).send(e);
  }
});

passport.use(new BasicStrategy((username, password, cb) => {
  if(username === 'gdzc' && password === acl_password)
    cb(null, 'gdzc');
  else cb('err');
}));
let upload = multer({dest: 'uploads/'});
router.put('/mergeXls',
  passport.authenticate('basic', {session: false}),
  upload.single('xlsFile'), async (req, res, next) => {
    try {
      let gdzcXls = new GdzcXls();
      gdzcXls.load(req.file.path);
      await gdzc.merge(gdzcXls)
      res.send({ret:0, data: 'done'});
    } catch(e) {
      res.status(500).send(e);
    }
  });

export default router;
