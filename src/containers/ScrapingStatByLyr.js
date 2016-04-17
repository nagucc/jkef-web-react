import { connect } from 'react-redux'
import StatByLyr from '../components/StatByLyr';
import percentage from 'percentage';

const mapStateToProps = (state, ownProps) => {
  let title = '待报废资产'
  // 返回所有资产按年度的金额统计
  if(!state.statByLyr) return {
    loading: true,
    title
  };


  let maxAmount = 0, maxCount = 0;
  state.statByLyr.forEach(item => {
    maxAmount = maxAmount > item.value.scrapingAmount ? maxAmount : item.value.scrapingAmount;
    maxCount = maxCount > item.value.scrapingCount ? maxCount : item.value.scrapingCount;
  });

  return {
    stat: state.statByLyr.map(item => ({
      lyr: item._id,
      amount: item.value.scrapingAmount,
      count: item.value.scrapingCount,
      pamount: percentage(item.value.scrapingAmount/maxAmount),
      pcount: percentage(item.value.scrapingCount/maxCount),
      link: `/items?onlyScraping=true&lyr=${item._id}`
    })),
    title
  }
}
export default connect(mapStateToProps)(StatByLyr);
