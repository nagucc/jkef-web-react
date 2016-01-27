var React = require('react');

var Items = React.createClass({

	render: function() {
		return (
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
		);
	}

});

module.exports = Items;