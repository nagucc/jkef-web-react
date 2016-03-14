import { connect } from 'react-redux'
import StatByYear from '../../components/Gdzc/StatByYear';

const mapStateToProps = (state, ownProps) => {
  if(!state.statByYear) return {};

  let barData = {
    labels: state.statByYear.map(val => val._id)
  };
  let color = {
    fillColor: "rgba(220,220,220,0.5)",
    strokeColor: "rgba(220,220,220,0.8)",
    highlightFill: "rgba(220,220,220,0.75)",
    highlightStroke: "rgba(220,220,220,1)"
  };

  // 显示“金额按年统计”Bar图表用的数据，数据结构见：http://www.chartjs.org/docs/#bar-chart-data-structure
  let yearAmountByYearBarData = Object.assign({}, barData, {
    datasets: [{
      label: '金额',
      data: state.statByYear.map((val) => Math.round(val.value.amount)),
      ...color
    }]
  });

  let yearCountBarData = Object.assign({}, barData, {
    datasets: [{
      label: '数量',
      data: state.statByYear.map((val) => Math.round(val.value.count)),
      ...color
    }]
  });
  let dxsbCountBarData = Object.assign({}, barData, {
    datasets: [{
      label: '大型设备数量',
      data: state.statByYear.map((val) => val.value.dxsbCount),
      ...color
    }]
  });
  let dxsbAmountBarData = Object.assign({}, barData, {
    datasets: [{
      label: '大型设备金额',
      data: state.statByYear.map((val) => Math.round(val.value.dxsbAmount)),
      ...color
    }]
  });
  let scrapingAmountBarData = Object.assign({}, barData, {
    datasets: [{
      label: '待报废资产金额',
      ...color,
      data: state.statByYear.map((val) => Math.round(val.value.scrapingAmount))
    }]
  });
  let scrapingCountBarData = Object.assign({}, barData, {
    datasets: [{
      label: '待报废数量',
      ...color,
      data: state.statByYear.map((val) => val.value.scrapingCount)
    }]
  });
  return {
    yearAmountByYearBarData,
    yearCountBarData,
    dxsbAmountBarData,
    dxsbCountBarData,
    scrapingCountBarData,
    scrapingAmountBarData
  }
}
export default connect(mapStateToProps)(StatByYear);
