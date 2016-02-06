var React = require('react');
import Info from './Info';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';
import Search from '../../Ace/Breadcrumbs/Search';
import $ from 'jquery';

var Index = React.createClass({
	getDefaultProps: function() {
		return {
			acceptors: [],
			enableBreadcrumbs: false,
			enableSettings: false,
			pageSize: 20,
			year: '',
			project: ''
		};
	},
	getInitialState: function() {
		return {
			pageIndex: 0,
			allAcceptors: this.props.acceptors,
			acceptors: this.props.acceptors,
			count: this.props.count
		};
	},
	componentDidMount: function() {
		
	},
	getMore: function (text = '', pageIndex = 0) {
		var oldAllAcceptors = this.state.allAcceptors;
		var oldAcceptors = this.state.acceptors;
		if(pageIndex === 0){
			oldAllAcceptors = [];
			oldAcceptors = [];
		}
		// `/api/jkef/acceptors/search/${text}?page=${pageIndex}&size=${this.props.pageSize}`
		$.ajax(`/api/jkef/acceptors/search/${text}`, {
			data: {
				page: pageIndex,
				size: this.props.pageSize,
				project: this.state.project,
				year: this.state.year
			}
		}).done(result => {
			this.setState({
				pageIndex: pageIndex,
				text: text,
				count: result.count,
				allAcceptors: oldAllAcceptors.concat(result.data),
				acceptors: oldAcceptors.concat(result.data)
			});
	   }).fail(err => {
	   	alert(`获取数据出错：${err.responseText}`);
	   });
	},
	search: function (e) {
		var text = e.target.value;
		console.log(text);
		this.getMore(text, 0);
	},
	btnMoreClick: function () {
		this.getMore(this.state.text, this.state.pageIndex + 1);
	},
	render: function() {
		var breadcrumbs = null;
		if(this.props.enableBreadcrumbs) breadcrumbs = <Breadcrumbs />;

		var settings = null;
		if(this.props.enableSettings) settings = <Settings />;

		var moreBtn = null;
		if(this.state.allAcceptors.length < this.state.count)
			moreBtn = <button className="btn btn-block btn-primary" onClick={this.btnMoreClick}>更多（{(this.state.pageIndex + 1) * this.props.pageSize}/{this.state.count}）</button>;

		var yearOptions = [];
		for(var i = 2006; i <= (new Date()).getFullYear(); i ++){
			yearOptions.push(<option value={i}>{i}</option>);
		}
		return (
<div className="main-content">
	<div className="main-content-inner">
		{breadcrumbs}
		<div className="page-content">
			{settings}
			<div className="row">
				<div className="col-sm-4 page-header">
					<h1>
						捐赠管理
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
							受赠者列表
						</small>
					</h1>
				</div>
				<div className="col-sm-2">
					<select>
						<option value="">全部项目</option>
						<option value="奖学金">奖学金</option>
						<option value="助学金">助学金</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div className="col-sm-2">
					<select>
						<option>全部年份</option>
						{yearOptions}
					</select>
				</div>
				<div className="col-sm-4">
					<Search placeholder="搜索姓名／电话／证件号码" style={{width:'250px'}} onSearchTextChange={this.search}/>
				</div>
			</div>
			<div className="row">
				
				
				<div className="col-xs-12 col-sm-9 col-sm-offset-2">
				{
					this.state.acceptors.map(acceptor => {
						return <Info {...acceptor} key={acceptor._id} />;
					})
				}
				</div>
				<div className="col-xs-12 col-sm-9 col-sm-offset-2">
					{moreBtn}
				</div>
			</div>
		</div>
	</div>
</div>
		);
	}

});

export default Index;
