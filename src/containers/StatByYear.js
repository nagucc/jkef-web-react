import { connect } from 'react-redux'
import StatByYear from '../components/StatByYear';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {

  // 返回所有资产按年度的金额统计
  if(!state.statByYear) return {};

  let maxAmount = 0, maxCount = 0;
  state.statByYear.forEach(item => {
    maxAmount = maxAmount > item.value.amount ? maxAmount : item.value.amount;
    maxCount = maxCount > item.value.count ? maxCount : item.value.count;
  });

  return {
    stat: state.statByYear.map(item => ({
      year: item._id,
      amount: item.value.amount,
      count: item.value.count,
      pamount: percentage(item.value.amount/maxAmount),
      pcount: percentage(item.value.count/maxCount),
      link: `/item?year=${item._id}`
    })),
    title: '全部资产统计'
  }
}
export default connect(mapStateToProps)(StatByYear);
