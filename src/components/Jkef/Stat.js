import React from 'react';
import Settings from '../Ace/Settings';
import Breadcrumbs from '../Ace/Breadcrumbs';
import accounting from 'accounting';
import {Bar} from 'react-chartjs'
// import Chart from 'chart.js';
import {fetchJkefStat} from '../../redux/actions';

export default class Stat extends React.Component {


	componentWillReceiveProps(nextProps) {

		// 历年捐款金额表
		var ctx = document.getElementById("yearAmountStat").getContext("2d");
		new Chart(ctx).Bar(nextProps.yearAmountStat.barData);

		// 历年捐款次数统计
		ctx = document.getElementById("yearCountStat").getContext("2d");
		new Chart(ctx).Bar(nextProps.yearCountStat.barData);

		// 项目金额饼图
		ctx = document.getElementById("projectAmountStat").getContext("2d");
		new Chart(ctx).Pie(nextProps.projectAmountStat.pieData);
	}

  componentDidMount() {
		Chart.defaults.global.responsive = true;
		this.props.dispatch(fetchJkefStat());
	}

  render() {
    return (
    	<div>
				<div className="page-header">
					<h1>
						历年统计
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
						</small>
					</h1>
				</div>
        <div className="row">
    	  	<div className="col-sm-6">
      			<div className="widget-box">
							<div className="widget-header widget-header-flat widget-header-small">
								<h5 className="widget-title">
									<i className="ace-icon fa fa-signal"></i>
									捐赠金额（总金额：{accounting.formatMoney(this.props.amount, '¥')}元）
								</h5>
							</div>
							<div className="widget-body">
								<div className="widget-main">
									<canvas id="yearAmountStat" ></canvas>
								</div>
							</div>
						</div>
      		</div>
      		
        	<div className="col-sm-6">
        		<div className="widget-box">
							<div className="widget-header widget-header-flat widget-header-small">
								<h5 className="widget-title">
									<i className="ace-icon fa fa-signal"></i>
									受赠人次（总数：{accounting.formatNumber(this.props.count)}人次）
								</h5>
							</div>
							<div className="widget-body">
								<div className="widget-main">
									<canvas id="yearCountStat" ></canvas>
								</div>
							</div>
						</div>
        	</div>
        	<div className="col-sm-6">
        		<div className="widget-box">
							<div className="widget-header widget-header-flat widget-header-small">
								<h5 className="widget-title">
									<i className="ace-icon fa fa-signal"></i>
									各项目捐助金额（总数：{accounting.formatMoney(this.props.amount, '¥')}元）
								</h5>
							</div>
							<div className="widget-body">
								<div className="widget-main">
									<canvas id="projectAmountStat" ></canvas>
								</div>
							</div>
						</div>
        	</div>
      	</div>
    	</div>
    );
  }
}