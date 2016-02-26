/*
  使用Ace Admin Template的导航条组件
  注意：
  1. 删除navbar-header，以便移动版导航条不回变成两行。
*/


import UserInfo from './NavBar/UserInfo';

import React from 'react';

export default class NavBar extends React.Component {
  static propTypes = {
    enableUserInfo: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  };

  render() {
    return (
<div id="navbar" className="navbar navbar-default">
  <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
      <span className="sr-only">Toggle sidebar</span>

      <span className="icon-bar"></span>

      <span className="icon-bar"></span>

      <span className="icon-bar"></span>
  </button>

  <div className="navbar-header pull-left">
      <a href="#" className="navbar-brand">
          <small>
              <i className="fa fa-leaf"></i>
              {this.props.title}
          </small>
      </a>
  </div>
  {this.props.enableUserInfo ? <UserInfo/> : null}
</div>
        );
  }
}
