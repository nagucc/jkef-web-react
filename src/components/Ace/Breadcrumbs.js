var React = require('react');

import Search from './Search';

var Breadcrumbs = React.createClass({

	render: function() {
		return (
			<div className="breadcrumbs" id="breadcrumbs">
                <ul className="breadcrumb">
                    <li>
                        <i className="ace-icon fa fa-home home-icon"></i>
                        <a href="#">Home</a>
                    </li>

                    <li>
                        <a href="#">Other Pages</a>
                    </li>
                    <li className="active">Blank Page</li>
                </ul>

                <Search />
            </div>
		);
	}

});

module.exports = Breadcrumbs;