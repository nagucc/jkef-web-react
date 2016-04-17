import { connect } from 'react-redux'
import StatByLyr from '../components/StatByLyr';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {
  let title = '大型设备'
  // 返回所有资产按年度的金额统计
  if(!state.statByLyr) return {
    loading: true,
    title
  };


  let maxAmount = 0, maxCount = 0;
  state.statByLyr.forEach(item => {
    maxAmount = maxAmount > item.value.dxsbAmount ? maxAmount : item.value.dxsbAmount;
    maxCount = maxCount > item.value.dxsbCount ? maxCount : item.value.dxsbCount;
  });

  return {
    stat: state.statByLyr.map(item => ({
      lyr: item._id,
      amount: item.value.dxsbAmount,
      count: item.value.dxsbCount,
      pamount: percentage(item.value.dxsbAmount/maxAmount),
      pcount: percentage(item.value.dxsbCount/maxCount),
      link: `/items?onlyDxsb=true&lyr=${item._id}`
    })),
    title
  }
}
export default connect(mapStateToProps)(StatByLyr);
