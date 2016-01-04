var React = require('react');

var MoreButton = React.createClass({
	getDefaultProps: function() {
		return {
			text: '加载更多',
			click: function(){}
		};
	},
	render: function() {
		return (
			<div className="center" ng-if="start < total">
				<button type="button" className="btn btn-sm btn-primary btn-white btn-round" onClick={this.props.click}>
					<i className="ace-icon fa fa-rss bigger-150 middle orange2"></i>
					<span className="bigger-110">{this.props.text}</span>
					<i className="icon-on-right ace-icon fa fa-arrow-right"></i>
				</button>
			</div>
		);
	}

});

module.exports = MoreButton;