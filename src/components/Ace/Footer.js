import {title} from '../../config';

var React = require('react');

var Footer = React.createClass({

	render: function() {
		return (
			<div className="footer">
                <div className="footer-inner">
                    <div className="footer-content">
                        <span className="bigger-120">
                            <span className="blue bolder">{title}</span>
                             &copy; 2013-2016
                        </span>
                        <span className="action-buttons">
                            
                        </span>
                    </div>
                </div>
            </div>
		);
	}

});

module.exports = Footer;