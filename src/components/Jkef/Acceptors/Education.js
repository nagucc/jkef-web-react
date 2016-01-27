var React = require('react');
import ProfileInfoItem from './ProfileInfoItem';

var Education = React.createClass({
	getDefaultProps: function() {
		return {
			title: '教育信息'
		};
	},
	render: function() {
		var name, major, subject, admissionYear;
		if(this.props.name) name = <ProfileInfoItem name="学校名称" value={this.props.name} />;
		if(this.props.major) major = <ProfileInfoItem name="学院及专业" value={this.props.major} />;
		if(this.props.subject) subject = <ProfileInfoItem name= '研究方向' value={this.props.subject} />;
		if(this.props.admissionYear) admissionYear = <ProfileInfoItem name= '毕业年份' value={this.props.admissionYear} />;


		return (
<div className="col-xs-12 col-sm-9 col-sm-offset-2 well" >
	<h4 className="blue">
		{this.props.title}
	</h4>

	<div className="profile-user-info">
		{name}
		{major}
		{subject}
		{admissionYear}
	</div>
</div>
		);
	}

});

module.exports = Education;