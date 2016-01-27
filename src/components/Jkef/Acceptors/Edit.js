var React = require('react');
import BaseInfo from './EditBaseInfo';
import TextBox from './TextBox';

var Edit = React.createClass({
	getInitialState: function() {
		return this.props;
	},
	getDefaultProps: function() {
		return {
			highSchool: {},
			bachelorSchool: {},
			masterSchool: {},
			doctorSchool: {},
			company: {},
			idCard: {}
		};
	},
	getFieldHandler: function (name) {
		return (e) => {
			var value = e.target.value
			var states = {};

			states[name] = value;
			this.setState(states);
		};
	}, 
	getValueFieldHandler: function (name) {
		return (e) => {
			var value = e.target.value;
			console.log(e);
			this.setState((previousState) => {
				var names = name.split('.');
				var tmp = previousState;
				for(var i = 0; i < names.length - 1; i++) {
					tmp = tmp[names[i]];
				}
				tmp[names[names.length-1]] = value;
				return previousState;
			})
		};
	},
	render: function() {
		return (
<div className="main-content">
	<div className="main-content-inner">
		<div className="page-content">

			<div className="row">
				<div className="page-header pull-left">
					<h1>
						<span>编辑信息</span>
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
							{this.props.name}
						</small>
					</h1>
				</div>
				<div className="pull-right hidden-sm hidden-xs btn-group">
				<a className="btn btn-xs btn-warning" href="#/acceptors/list">
					<i className="ace-icon fa fa-users bigger-120"></i>
				</a>
			</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">基本信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="姓名" value={this.state.name} onChange={this.getValueFieldHandler('name')}/>
								<TextBox text="手机号" value={this.state.phone} onChange={this.getValueFieldHandler('phone')}/>

								<div>
									<label htmlFor="form-field-8">性别</label>

									<select className="form-control" defalutValue={this.state.isMale}>
										<option value="true">男</option>
										<option value="false">女</option>
									</select>

								</div>
								<TextBox text="家庭住址" value={this.state.address} onChange={this.getValueFieldHandler('address')}/>
								
								<div>
									<label htmlFor="form-field-8">证件类型</label>
									<select className="form-control" defalutValue={this.state.idCard.category}>
										<option defalutValue="身份证">身份证（个人）</option>
										<option defalutValue="组织机构代码证">组织机构代码证（机构）</option>
									</select>
								</div>
								<TextBox text="证件号码" value={this.state.idCard.number} onChange={this.getValueFieldHandler('idCard.number')}/>
								<TextBox text="纳古志愿者微信Id" value={this.state.wxent_UserIds[0]} />
								<TextBox text="助学金推荐人" type="checkbox" value={this.state.isRecommander} onChange={this.getValueFieldHandler('isRecommander')}/>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">高中阶段信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="学校名称" value={this.state.highSchool.name} onChange={this.getValueFieldHandler('highSchool.name')}/>
								<TextBox text="毕业年份" value={this.state.highSchool.admissionYear} onChange={this.getValueFieldHandler('highSchool.admissionYear')}/>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">大学阶段信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="学校名称" value={this.state.bachelorSchool.name} onChange={this.getValueFieldHandler('bachelorSchool.name')}/>
								<TextBox text="学院及专业" value={this.state.bachelorSchool.major} onChange={this.getValueFieldHandler('bachelorSchool.major')}/>
								<TextBox text="毕业年份" value={this.state.bachelorSchool.admissionYear} onChange={this.getValueFieldHandler('bachelorSchool.admissionYear')}/>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">硕士学生信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="学校名称" value={this.state.masterSchool.name} />
								<TextBox text="学院及专业" value={this.state.masterSchool.major} />
								<TextBox text="研究方向" value={this.state.masterSchool.subject} />
								<TextBox text="毕业年份" value={this.state.masterSchool.admissionYear} />
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">博士学生信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="学校名称" value={this.state.doctorSchool.name} />
								<TextBox text="学院及专业" value={this.state.doctorSchool.major} />
								<TextBox text="研究方向" value={this.state.doctorSchool.subject} />
								<TextBox text="毕业年份" value={this.state.doctorSchool.admissionYear} />
							</div>
						</div>
					</div>
				</div>

				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">工作阶段信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="单位名称" value={this.state.company.name} />
								<TextBox text="职称／职务" value={this.state.company.title} />
							</div>
						</div>
					</div>
				</div>
			</div>

			

			<div className="clearfix form-actions row">
				<div className="col-md-offset-3 col-md-9">
					<button className="btn btn-info" type="button" ng-click="actions.submit(acceptor)">
						<i className="ace-icon fa fa-check bigger-110"></i>
						确定
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = Edit;