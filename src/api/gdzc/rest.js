import { wxentJkefConfig as wxcfg } from '../../config';
import { Router } from 'express';
import moment from 'moment';
import xlsx from 'xlsx';
import GdzcModel from './model';

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
        lyrs: await gdzc.getLyrs(),
        glrs: await gdzc.getGlrs(),
        ... await gdzc.dxsbTotalStat(),
        ... await gdzc.scrapingTotalStat()
      }
    });
  } catch(e) {
    res.status(500).send(e);
  }
})

router.get('/items/search', async(req, res, next) => {
  var {bqh, year, glr, lyr, onlyScraping, onlyDxsb} = req.query;
  try {
    res.send({
      ret: 0,
      data: await gdzc.search(bqh, year, lyr, glr, onlyScraping, onlyDxsb, 0)
    });
  } catch(e) {
    res.status(500).send(e);
  }
});

export default router;
