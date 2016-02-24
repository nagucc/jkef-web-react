/*
  使用Ace Admin Template的MainContainer组件
*/


import SideBarShortcuts from './SideBarShortcuts';
import SideBarNavList from './SideBarNavList';
import Settings from './Settings';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import {enableBreadcrumbs, enableSettings} from '../../config';

import React from 'react';

export default class MainContainer extends React.Component {
  static propTypes = {
    sidebarShortcuts: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      enableBreadcrumbs: enableBreadcrumbs,
      enableSettings: enableSettings 
    };
  }

  render() {
    var breadcrumbs = null;
      if(this.state.enableBreadcrumbs) breadcrumbs = <Breadcrumbs {...this.props} />;
      var settings = null;
      if(this.state.enableSettings) settings = <Settings />;

      return (
          <div className="main-container" id="main-container">
              <div id="sidebar" className="sidebar responsive">
                  
                  <SideBarShortcuts />
                  <SideBarNavList />
                  <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                      <i className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                  </div>
              </div>

              {this.props.children}
              
              <Footer />

          </div>
        );
  }
}