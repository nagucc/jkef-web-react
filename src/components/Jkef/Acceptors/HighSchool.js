var React = require('react');

var HighSchool = React.createClass({
	getInitialState: function() {
		return this.props;
	},

	render: function() {
		return (
<div className="col-xs-12 col-sm-9 col-sm-offset-2 well" >
	<h4 className="blue">
		高中阶段信息
	</h4>

	<div className="profile-user-info">
		<div className="profile-info-row">
			<div className="profile-info-name"> 学校名称 </div>

			<div className="profile-info-value">
				<span>{this.state.name}</span>
			</div>
		</div>

		<div className="profile-info-row">
			<div className="profile-info-name"> 毕业年份 </div>

			<div className="profile-info-value">
				<span>{this.state.admissionYear}</span>
			</div>
		</div>
	</div>
</div>
		);
	}

});

module.exports = HighSchool;