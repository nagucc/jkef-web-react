import React from 'react';
import $ from 'jquery';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';
import accounting from 'accounting';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	amount: 0,
    	count: 0
    };
  }

  componentDidMount() {
		Chart.defaults.global.responsive = true;
		$.get('/api/jkef/stat/year').done((result) => {
			if(result.ret === 0){
				var amount = 0, count = 0;
				result.data.forEach((item) => {
					amount += item.value.amount;
					count += item.value.count;
				});
				this.setState({
					amount: amount,
					count: count
				});

				// 历年捐款金额表
				var ctx = document.getElementById("yearAmountStat").getContext("2d");
				new Chart(ctx).Bar({
					labels: result.data.map((val) => {
						return val._id + '年';
					}),
					datasets: [{
						label: '金额',
						fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
						data: result.data.map((val) => {
							return val.value.amount;
						})
					}]
				});

				// 历年受赠人次表
				ctx = document.getElementById("yearCountStat").getContext("2d");
				new Chart(ctx).Bar({
					labels: result.data.map((val) => {
						return val._id + '年';
					}),
					datasets: [{
						label: '受赠人次',
						fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
						data: result.data.map((val) => {
							return val.value.count;
						})
					}]
				});
			}
		});

		$.get('/api/jkef/stat/project').done((result) => {
			var colorMaker = function* () {
				yield ['#00CC00', '#9FEE00'];
				yield ['#1924B1', '#0969A2'];
				yield ['#FFEB00', '#FFC200'];
			}();
			if(result.ret === 0){

				// 
				var ctx = document.getElementById("projectAmountStat").getContext("2d");
				new Chart(ctx).Pie(result.data.map((item) => {
					var colors = colorMaker.next().value;
					console.log(colors);
					return {
						label: item._id,
						value: item.value.amount,
						color: colors[0],
						highlight: colors[1]
					};
				}));
			}
		})
	}

  static defaultProps = {
  	enableBreadcrumbs: false,
    enableSettings: false 
  }

  render() {
      var breadcrumbs = null;
    if(this.props.enableBreadcrumbs) breadcrumbs = <Breadcrumbs />;

    var settings = null;
    if(this.props.enableSettings) settings = <Settings />;

    return (
    	<div className="main-content">
        <div className="main-content-inner">
          {breadcrumbs}
          <div className="page-content">
          	<div className="page-header">
							<h1>
								历年统计
								<small>
									<i className="ace-icon fa fa-angle-double-right"></i>
								</small>
							</h1>
						</div>
            {settings}
	          <div className="row">
	      	  	<div className="col-sm-6">
	        			<div className="widget-box">
									<div className="widget-header widget-header-flat widget-header-small">
										<h5 className="widget-title">
											<i className="ace-icon fa fa-signal"></i>
											捐赠金额（总金额：{accounting.formatMoney(this.state.amount, '¥')}元）
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
											受赠人次（总数：{accounting.formatNumber(this.state.count)}人次）
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
											各项目捐助金额（总数：{accounting.formatMoney(this.state.amount, '¥')}元）
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
        </div>
    	</div>
    );
  }
}