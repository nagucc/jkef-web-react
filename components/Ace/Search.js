var React = require('react');

var Search = React.createClass({

	render: function() {
		return (
			<div className="nav-search" id="nav-search">
                <form className="form-search">
                    <span className="input-icon">
                        <input type="text" placeholder="Search ..." className="nav-search-input" id="nav-search-input" autocomplete="off" />
                        <i className="ace-icon fa fa-search nav-search-icon"></i>
                    </span>
                </form>
            </div>
		);
	}

});

module.exports = Search;