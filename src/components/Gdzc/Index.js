'use strict';
import React from 'react';
import accounting from 'accounting';
import {Bar} from 'react-chartjs'
import * as actions from '../../redux/actions';

class Index extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchTotalStat());
	}

  render() {
    return (
      <div className="row">
        <h3 className="header blue smaller">概览</h3>
        <div className="col-xs-12 infobox-container">
          <div className="infobox infobox-green" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-comments"></i>
						</div>
						<div className="infobox-data">
							<span className="infobox-data-number">{accounting.formatMoney(this.props.amount, '¥')}元</span>
							<div className="infobox-content"><a href="#">资产总原值</a></div>
						</div>
					</div>
          <div className="infobox infobox-blue" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-twitter"></i>
						</div>

						<div className="infobox-data">
							<span className="infobox-data-number">{accounting.formatNumber(this.props.count)}项</span>
							<div className="infobox-content"><a href="#">资产数量</a></div>
						</div>
					</div>
          <div className="infobox infobox-pink" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-twitter"></i>
						</div>

						<div className="infobox-data">
							<span className="infobox-data-number">{this.props.lyrs.length}名</span>
							<div className="infobox-content"><a href="#">领用人</a></div>
						</div>
					</div>
          <div className="infobox infobox-red" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-twitter"></i>
						</div>

						<div className="infobox-data">
							<span className="infobox-data-number">{this.props.glrs.length}名</span>
							<div className="infobox-content"><a href="#">管理人</a></div>
						</div>
					</div>
          <div className="infobox infobox-orange2" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-twitter"></i>
						</div>

						<div className="infobox-data">
							<span className="infobox-data-number">{accounting.formatNumber(this.props.dxsbCount)}项</span>
							<div className="infobox-content"><a href="#">大型设备</a></div>
						</div>
					</div>
          <div className="infobox infobox-blue2" style={{width:'270px'}}>
						<div className="infobox-icon">
							<i className="ace-icon fa fa-twitter"></i>
						</div>

						<div className="infobox-data">
							<span className="infobox-data-number">{accounting.formatNumber(this.props.scrapingCount)}项</span>
							<div className="infobox-content"><a href="#">待报废资产</a></div>
						</div>
					</div>
        </div>
      </div>
    );
  }

}

export default Index;
