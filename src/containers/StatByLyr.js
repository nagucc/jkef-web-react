import { connect } from 'react-redux'
import StatByLyr from '../components/StatByLyr';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {
  let title = '全部资产'
  // 返回所有资产按年度的金额统计
  if(!state.statByLyr) return {
    loading: true,
    title
  };


  let maxAmount = 0, maxCount = 0;
  state.statByLyr.forEach(item => {
    maxAmount = maxAmount > item.value.amount ? maxAmount : item.value.amount;
    maxCount = maxCount > item.value.count ? maxCount : item.value.count;
  });

  return {
    stat: state.statByLyr.map(item => ({
      lyr: item._id,
      amount: item.value.amount,
      count: item.value.count,
      pamount: percentage(item.value.amount/maxAmount),
      pcount: percentage(item.value.count/maxCount),
      link: `/items?lyr=${item._id}`
    })),
    title
  }
}
export default connect(mapStateToProps)(StatByLyr);
