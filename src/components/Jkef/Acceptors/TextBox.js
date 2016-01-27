var React = require('react');

var TextBox = React.createClass({
	getDefaultProps: function() {
		return {
			id: 'jk'+ Math.round(Math.random()*100000000000),
			text: 'Text',
			value: '',
			OnChange: (e) =>{},
			type: 'text',
			placeholder: ''
		};
	},

	render: function() {
		return (
<div>
	<label htmlFor={this.props.id}>{this.props.text}</label>

	<input className="form-control" defaultValue={this.props.value} onChange={this.props.onChange} id={this.props.id} type={this.props.type} placeholder={this.props.placeholder}></input>
</div>
		);
	}

});

module.exports = TextBox;