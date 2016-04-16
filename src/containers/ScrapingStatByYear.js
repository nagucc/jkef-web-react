import { connect } from 'react-redux'
import StatByYear from '../components/StatByYear';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {

  // 返回待报废资产按年度的统计
  if(!state.statByYear) return {};

  let maxAmount = 0, maxCount = 0;
  state.statByYear.forEach(item => {
    maxAmount = maxAmount > item.value.scrapingAmount ? maxAmount : item.value.scrapingAmount;
    maxCount = maxCount > item.value.scrapingCount ? maxCount : item.value.scrapingCount;
  });

  return {
    stat: state.statByYear.map(item => ({
      year: item._id,
      amount: item.value.scrapingAmount,
      count: item.value.scrapingAmount,
      pamount: percentage(item.value.scrapingAmount/maxAmount),
      pcount: percentage(item.value.scrapingCount/maxCount),
      link: `/items?year=${item._id}&onlyScraping=true`
    })),
    title: '待报废资产统计'
  }
}
export default connect(mapStateToProps)(StatByYear);
