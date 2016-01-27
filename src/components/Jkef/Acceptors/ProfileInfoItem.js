var React = require('react');

var ProfileInfoItem = React.createClass({
	getDefaultProps: function() {
		return {
			name: 'name',
			value: 'value'
		};
	},
	render: function() {
		return (
		<div className="profile-info-row">
			<div className="profile-info-name"> {this.props.name} </div>

			<div className="profile-info-value">
				<span>{this.props.value}</span>
			</div>
		</div>
		);
	}

});

module.exports = ProfileInfoItem;