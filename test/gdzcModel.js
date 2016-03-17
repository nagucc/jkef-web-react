import {describe, it} from 'mocha';
import {expect} from 'chai';
import GdzcModel from '../src/api/gdzc/model';
import GdzcXls from '../src/api/gdzc/gdzcXls';

describe('Gdzc Model', function() {
  this.timeout(90000);
  var gdzc = new GdzcModel();
  it('merge xls to model', async ()=>{
    var xls = new GdzcXls();
    xls.load('gdzc.xls');
    await gdzc.merge(xls);
  });

  it('findByBqh', async () => {
    let zc = await gdzc.findByBqh('200100221500');
    expect(zc['设备名称']).to.eql('数码相机');
  });

  it('findByLyr', async ()=> {
    let zcs = await gdzc.findByLyr('纳文琪');
    expect(zcs.length).to.above(0);
    expect(zcs[0]['领用人']).to.eql('纳文琪');
  });

  it('getLyrs', async () => {
    let lyrs = await gdzc.getLyrs();
    expect(lyrs.length).to.above(0);
  });

  it('findByGlr', async ()=> {
    let zcs = await gdzc.findByGlr('李汉斌');
    expect(zcs.length).to.above(0);
    expect(zcs[0]['管理人']).to.eql('李汉斌');
  });

  it('getGlrs', async () => {
    let lyrs = await gdzc.getGlrs();
    expect(lyrs.length).to.above(0);
  });

  it('count', async () => {
    let count = await gdzc.count();
    expect(count).to.above(10);
  });

  it('amount', async () => {
    let amount = await gdzc.amount();
    expect(amount).to.above(10);
  });

  it('statByYear', async () => {
    await gdzc.computeStatByYear();
    let result = await gdzc.statByYear();
    expect(result).to.be.ok;
  });

  it('dxsbTotalStat', async() => {
    let result = await gdzc.dxsbTotalStat();
    expect(result.dxsbCount).to.above(10);
    expect(result.dxsbAmount).to.above(100000);
  });
  it('search', async() =>{
    gdzc.search('df');
  })
});
