'use strict';
import React from 'react';
import accounting from 'accounting';
import {Bar} from 'react-chartjs'
import * as actions from '../../redux/actions/gdzc';

class StatByYear extends React.Component {

  componentWillReceiveProps(nextProps) {

		// 历年购入资产金额表
		let ctx = document.getElementById("yearAmountStat").getContext("2d");
		new Chart(ctx).Bar(nextProps.yearAmountByYearBarData);
    // document.getElementById("yearAmountStat").onclick = function(evt) {
    //   // console.log('active::::', barAmount.getBarsAtEvent(evt));
    // }

		// 历年购入资产数量统计
		let ctxYearCount = document.getElementById("yearCountStat").getContext("2d");
		new Chart(ctxYearCount).Bar(nextProps.yearCountBarData);

    // 历年购入大型设备金额统计
		ctx = document.getElementById("dxsbAmount").getContext("2d");
		new Chart(ctx).Bar(nextProps.dxsbAmountBarData);

    // 历年购入大型设备数量统计
		ctx = document.getElementById("dxsbCount").getContext("2d");
		new Chart(ctx).Bar(nextProps.dxsbCountBarData);

    // 历年待报废资产金额统计
		ctx = document.getElementById("scrapingAmount").getContext("2d");
		new Chart(ctx).Bar(nextProps.scrapingAmountBarData);

    // 历年待报废资产数量统计
		ctx = document.getElementById("scrapingCount").getContext("2d");
		new Chart(ctx).Bar(nextProps.scrapingCountBarData);
	}

  componentDidMount() {
		Chart.defaults.global.responsive = true;
		this.props.dispatch(actions.fetchStatByYear());
	}

  render() {
    return (
      <div className="row">
        <h3 className="header blue smaller">年度统计</h3>
        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								购入资产原值(单位：元)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="yearAmountStat" ></canvas>
							</div>
						</div>
					</div>
        </div>
        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								购入资产数量(单位：项)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="yearCountStat" ></canvas>
							</div>
						</div>
					</div>
        </div>

        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								大型设备金额(单位：元)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="dxsbAmount" ></canvas>
							</div>
						</div>
					</div>
        </div>
        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								大型设备数量(单位：项)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="dxsbCount" ></canvas>
							</div>
						</div>
					</div>
        </div>
        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								待报废资产金额(单位：元)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="scrapingAmount" ></canvas>
							</div>
						</div>
					</div>
        </div>
        <div className="col-xs-12">
          <div className="widget-box">
						<div className="widget-header widget-header-flat widget-header-small">
							<h5 className="widget-title">
								<i className="ace-icon fa fa-signal"></i>
								待报废资产数量(单位：项)
							</h5>
						</div>
						<div className="widget-body">
							<div className="widget-main">
								<canvas id="scrapingCount" ></canvas>
							</div>
						</div>
					</div>
        </div>
      </div>
    );
  }

}

export default StatByYear;
