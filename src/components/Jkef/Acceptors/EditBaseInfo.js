var React = require('react');
import TextBox from './TextBox';

var EditBaseInfo = React.createClass({
	getDefaultProps: function() {
		return {
			idCard: {},
			wxent_UserIds: [{userId: ''}],
			getFieldHandler: (e) => {}
		};
	},
	getInitialState: function() {
		return this.props;
	},
	
	render: function() {
		return (
<div className="col-xs-12 col-sm-4">
	<div className="widget-box">
		<div className="widget-header">
			<h4 className="widget-title">基本信息</h4>
		</div>

		<div className="widget-body">
			<div className="widget-main">
				<TextBox text="姓名" value={this.state.name} />
				<TextBox text="手机号" value={this.state.phone} />

				<div>
					<label htmlFor="form-field-8">性别</label>

					<select className="form-control" defalutValue={this.state.isMale}>
						<option defalutValue={true}>男</option>
						<option defalutValue={false}>女</option>
					</select>

				</div>
				<TextBox text="家庭住址" value={this.state.address} />
				
				<div>
					<label htmlFor="form-field-8">证件类型</label>
					<select className="form-control" defalutValue={this.state.idCard.category}>
						<option defalutValue="身份证">身份证（个人）</option>
						<option defalutValue="组织机构代码证">组织机构代码证（机构）</option>
					</select>
				</div>
				<TextBox text="证件号码" value={this.state.idCard.number} />
				<TextBox text="纳古志愿者微信Id" value={this.state.wxent_UserIds[0]} />

				<div>
					<input type="checkbox" defalutValue={this.state.isRecommander} className="" id="form-field-recommander" placeholder=""></input>
					<label htmlFor="form-field-recommander">助学金推荐人</label>
				</div>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = EditBaseInfo;