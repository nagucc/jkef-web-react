var React = require('react');

var Info = React.createClass({
	getDefaultProps: function() {
		return {
			idCard: {},
			isMale: true
		};
	},
	render: function() {
		var phone, idCard;
		if(this.props.phone) phone = (
			<div className="profile-info-row">
				<div className="profile-info-name"> 手机号 </div>

				<div className="profile-info-value">
					<span>{this.props.phone}</span>
				</div>
			</div>
		);
		if(this.props.idCard && this.props.number) idCard = (
			<div className="profile-info-row">
				<div className="profile-info-name"> 证件及号码 </div>

				<div className="profile-info-value">
					<span>{this.props.idCard.category} | {this.props.idCard.number}</span>
				</div>
			</div>
		);
		return (
			<div className="well">
				<div>
					<h4 className="blue pull-left">
						<i className={`fa fa-user ${this.props.isMale? 'blue' : 'orange'}`}></i>
						<a href={`/acceptors/detail/${this.props._id}`} className="middle"> {this.props.name} </a>
					</h4>
				</div>

				<div className="profile-user-info">
					{phone}

					{idCard}
				</div>
			</div>
		);
	}

});

module.exports = Info;