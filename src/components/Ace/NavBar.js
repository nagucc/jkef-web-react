/*
  使用Ace Admin Template的导航条组件
  注意：
  1. 删除navbar-header，以便移动版导航条不回变成两行。
*/


import UserInfo from './NavBar/UserInfo';
import { title, description } from '../../config';

import React from 'react';

export default class NavBar extends React.Component {
  static propTypes = {
    enableUserInfo: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    var userInfo = null;
    if(this.props.enableUserInfo) userInfo = <UserInfo {...this.props}/>;
        
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
              {title}
          </small>
      </a>
  </div>
  {userInfo}
</div>
        );
  }
}
