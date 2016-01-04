/*
  使用Ace Admin Template的导航条组件
*/

var React = require('react');
import Ajax from 'react-ajax';

var UserInfo = React.createClass({

    getInitialState: function() {
        return {
            logged: false,
            me: {}
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://api.jkef.nagu.cc/auth/me',
            xhrFields: {
              withCredentials: true
           }
       }).always(function (result) {
            console.log(result);
            this.setState({
                me: result.data
            });
       }.bind(this));
    },

    render: function() {
        return (
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
        );
    }

});

module.exports = UserInfo;
