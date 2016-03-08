import {describe, it} from 'mocha';
import {expect} from 'chai';
import GdzcXls from '../src/api/gdzc/gdzcXls';

describe('Gdzc Xls', function() {
  this.timeout(15000);
  var xls = new GdzcXls('gdzc.xls');
  it('Load Xls file', () => {
    xls.load();
    expect(xls.sheet).to.be.ok;
  });

  it('Get Range', () => {
    let range = xls.range();
    expect(range).to.be.ok;
    expect(range.s.c).to.be.eql(0);
    expect(range.s.r).to.be.eql(0);
    expect(range.e.c).to.be.above(0);
    expect(range.e.r).to.be.above(0);
  });

  it('Get Cell Address', ()=> {
    let address = xls.getCellAddress(0,0);
    expect(address).to.be.eql('A1');
  });

  it('Get Title', () => {
    let title = xls.getTitle(2);
    expect(title).to.be.a('String');
  });

  it('GetRowData', ()=>{
    let row = xls.getRowData(1);
    expect(row).to.be.ok;
    expect(row['设备名称']).to.be.ok;
  });
})
