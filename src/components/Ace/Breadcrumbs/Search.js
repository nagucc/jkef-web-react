var React = require('react');

var Search = React.createClass({
    getDefaultProps: function() {
        return {
            placeholder: 'Search...',
            onSearchTextChange: event => {},
            style: {}
        };
    },

	render: function() {
		return (
			<div className="nav-search" id="nav-search">
                <form className="form-search">
                    <span className="input-icon">
                        <input type="text" style={this.props.style} placeholder={this.props.placeholder} onChange={this.props.onSearchTextChange} className="nav-search-input" id="nav-search-input" />
                        <i className="ace-icon fa fa-search nav-search-icon"></i>
                    </span>
                </form>
            </div>
		);
	}

});

module.exports = Search;