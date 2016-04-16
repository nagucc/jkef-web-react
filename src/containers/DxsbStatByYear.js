import { connect } from 'react-redux'
import StatByYear from '../components/StatByYear';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {

  // 返回大型设备按年度的金额统计
  if(!state.statByYear) return {};

  let maxAmount = 0, maxCount = 0;
  state.statByYear.forEach(item => {
    maxAmount = maxAmount > item.value.dxsbAmount ? maxAmount : item.value.dxsbAmount;
    maxCount = maxCount > item.value.dxsbCount ? maxCount : item.value.dxsbCount;
  });

  return {
    stat: state.statByYear.map(item => ({
      year: item._id,
      amount: item.value.dxsbAmount,
      count: item.value.dxsbAmount,
      pamount: percentage(item.value.dxsbAmount/maxAmount),
      pcount: percentage(item.value.dxsbCount/maxCount),
      link: `/items?year=${item._id}&onlyDxsb=true`
    })),
    title: '大型设备统计'
  }
}
export default connect(mapStateToProps)(StatByYear);
