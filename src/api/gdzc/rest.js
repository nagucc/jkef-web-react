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
        count: await gdzc.count()
      }
    });
  } catch(e) {
    res.status(500).send(e);
  }
})

export default router;
