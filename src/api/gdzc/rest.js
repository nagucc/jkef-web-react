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

router.get('/stat/total', async(req, res, next) => {
  try{
    res.send({
      ret: 0,
      data: {
        amount: await gdzc.amount(),
        count: await gdzc.count(),
        lyrs: [],
        glrs: [],
        // lyrs: await gdzc.getLyrs(),
        // glrs: await gdzc.getGlrs(),
        ... await gdzc.dxsbTotalStat(),
        ... await gdzc.scrapingTotalStat()
      }
    });
  } catch(e) {
    res.status(500).send(e);
  }
})

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
