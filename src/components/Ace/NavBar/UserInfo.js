/*
  使用Ace Admin Template的导航条组件
*/

import $ from 'jquery';

var React = require('react');
var UserInfo = React.createClass({

    getInitialState: function() {
        return {
            logged: false,
            me: {}
        };
    },
    componentDidMount: function() {
        $.ajax('/api/auth/wx-ent/me', {
            xhrFields: {
                withCredentials: true
              }
       }).done(result => {
            this.setState({
                me: result.data
            });
       });
    },

    render: function() {
        return this.state.me ? (
            <div className="navbar-buttons navbar-header pull-right" role="navigation">
                <ul className="nav ace-nav">
                    <li className="light-blue">
                        <a data-toggle="dropdown" href="#" className="dropdown-toggle">
                            <img className="nav-user-photo" src={this.state.me.avatar} />
                            <span className="user-info">
                                <small>欢迎你,</small>
                                {this.state.me.name}
                            </span>

                            <i className="ace-icon fa fa-caret-down"></i>
                        </a>
                    </li>
                </ul>
            </div>
        ) : null;
    }

});

module.exports = UserInfo;
