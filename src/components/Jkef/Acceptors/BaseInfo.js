var React = require('react');

var BaseInfo = React.createClass({
	getInitialState: function() {
		return {
			isMale: this.props.isMale,
			isRecommander: this.props.isRecommander,
			phone: this.props.phone,
			homeAddress: this.props.homeAddress,
			idCard: this.props.idCard || {}
		};
	},

	render: function() {
		var genderClass = this.state.isMale ? 'bule' : 'orange';
		var isRecommander = this.state.isRecommander? '是' : '否';
		return (
<div className="col-xs-12 col-sm-9 col-sm-offset-2 well" >

	<div className="profile-user-info">
		<div className="profile-info-row">
			<div className="profile-info-name"> 手机号 </div>

			<div className="profile-info-value">
				<span>{this.state.phone}</span>
			</div>
		</div>

		<div className="profile-info-row">
			<div className="profile-info-name"> 家庭住址 </div>

			<div className="profile-info-value">
				<i className="fa fa-map-marker light-orange bigger-110"></i>
				<span>{this.state.homeAddress}</span>
			</div>
		</div>

		<div className="profile-info-row">
			<div className="profile-info-name"> 证件及号码 </div>

			<div className="profile-info-value">
				<span>{this.state.idCard.category} | {this.state.idCard.number}</span>
			</div>
		</div>
		<div className="profile-info-row">
			<div className="profile-info-name"> 是否推荐人 </div>

			<div className="profile-info-value">
				<span>{isRecommander}</span>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = BaseInfo;