var React = require('react');
import BaseInfo from './EditBaseInfo';
import TextBox from './TextBox';
import $ from 'jquery';

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
			idCard: {
				category: '身份证'
			},
			isRecommander: false,
			isMale: true
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
			console.log(e.target.value);
			this.setState((previousState) => {
				var names = name.split('.');
				var tmp = previousState;
				for(var i = 0; i < names.length - 1; i++) {
					tmp = tmp[names[i]];
				}
				tmp[names[names.length-1]] = value;
				return previousState;
			});
		};
	},

	getCheckFieldHandler: function (name) {
		return (e) => {
			var value = e.target.checked;
			console.log(value);
			this.setState((previousState) => {
				var names = name.split('.');
				var tmp = previousState;
				for(var i = 0; i < names.length - 1; i++) {
					tmp = tmp[names[i]];
				}
				tmp[names[names.length-1]] = value;
				return previousState;
			});
		};
	},

	submit: function () {
		if(this.props._id) {			// 更新
			$.ajax('/api/jkef/acceptors/' + this.props._id, {
				method: 'post',
				xhrFields: {
			  	withCredentials: true
			  },
				data: this.state
			}).done((result)=>{
				window.location = '/acceptors/detail/' + this.props._id;
			});
		} else {						// 新增
			$.ajax('/api/jkef/acceptors',{
				method: 'put',
				xhrFields: {
			  	withCredentials: true
			  },
				data: this.state,
				success: (result) => {

				}
			});
		}
	},
	render: function() {
		var highSchool = this.props.highSchool || {};
		var bachelorSchool = this.props.bachelorSchool || {};
		var masterSchool = this.props.masterSchool || {};
		var doctorSchool = this.props.doctorSchool || {};
		var company = this.props.company || {};
		var idCard = this.props.idCard || {};
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
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-4">
					<div className="widget-box">
						<div className="widget-header">
							<h4 className="widget-title">基本信息</h4>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<TextBox text="姓名" value={this.props.name} onChange={this.getValueFieldHandler('name')}/>
								<TextBox text="手机号" value={this.props.phone} onChange={this.getValueFieldHandler('phone')}/>

								<div>
									<label htmlFor="form-field-8">性别</label>

									<select className="form-control" defalutValue={this.props.isMale} onChange={this.getValueFieldHandler('isMale')}>
										<option value="true">男</option>
										<option value="false">女</option>
									</select>

								</div>
								<TextBox text="家庭住址" value={this.props.homeAddress} onChange={this.getValueFieldHandler('homeAddress')}/>
								
								<div>
									<label htmlFor="form-field-8">证件类型</label>
									<select className="form-control" defalutValue={idCard.category} onChange={this.getValueFieldHandler('idCard.category')}>
										<option value="身份证">身份证（个人）</option>
										<option value="组织机构代码证">组织机构代码证（机构）</option>
									</select>
								</div>
								<TextBox text="证件号码" value={idCard.number} onChange={this.getValueFieldHandler('idCard.number')}/>
								<TextBox text="纳谷社区微信Id" value={this.props.nagu_wxent_userId} onChange={this.getValueFieldHandler('nagu_wxent_userId')} />
								<TextBox text="助学金推荐人" type="checkbox" value={this.props.isRecommander} onChange={this.getCheckFieldHandler('isRecommander')}/>
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
								<TextBox text="学校名称" value={highSchool.name} onChange={this.getValueFieldHandler('highSchool.name')}/>
								<TextBox text="毕业年份" value={highSchool.admissionYear} onChange={this.getValueFieldHandler('highSchool.admissionYear')}/>
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
								<TextBox text="学校名称" value={bachelorSchool.name} onChange={this.getValueFieldHandler('bachelorSchool.name')}/>
								<TextBox text="学院及专业" value={bachelorSchool.major} onChange={this.getValueFieldHandler('bachelorSchool.major')}/>
								<TextBox text="毕业年份" value={bachelorSchool.admissionYear} onChange={this.getValueFieldHandler('bachelorSchool.admissionYear')}/>
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
								<TextBox text="学校名称" value={masterSchool.name} onChange={this.getValueFieldHandler('masterSchool.name')}/>
								<TextBox text="学院及专业" value={masterSchool.major} onChange={this.getValueFieldHandler('masterSchool.major')}/>
								<TextBox text="研究方向" value={masterSchool.subject} onChange={this.getValueFieldHandler('masterSchool.subject')}/>
								<TextBox text="毕业年份" value={masterSchool.admissionYear} onChange={this.getValueFieldHandler('masterSchool.admissionYear')}/>
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
								<TextBox text="学校名称" value={doctorSchool.name} onChange={this.getValueFieldHandler('doctorSchool.name')}/>
								<TextBox text="学院及专业" value={doctorSchool.major} onChange={this.getValueFieldHandler('doctorSchool.major')}/>
								<TextBox text="研究方向" value={doctorSchool.subject} onChange={this.getValueFieldHandler('doctorSchool.subject')}/>
								<TextBox text="毕业年份" value={doctorSchool.admissionYear} onChange={this.getValueFieldHandler('doctorSchool.admissionYear')}/>
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
								<TextBox text="单位名称" value={company.name} onChange={this.getValueFieldHandler('company.name')}/>
								<TextBox text="职称／职务" value={company.title} onChange={this.getValueFieldHandler('company.title')}/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="clearfix form-actions row">
				<div className="col-md-offset-3 col-md-9">
					<button className="btn btn-info" type="button" onClick={this.submit}>
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