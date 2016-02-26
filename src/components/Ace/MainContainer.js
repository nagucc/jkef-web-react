/*
  使用Ace Admin Template的MainContainer组件
*/


import SideBarShortcuts from './SideBarShortcuts';
import SideBarNavList from './SideBarNavList';
import Footer from './Footer';

import React from 'react';

export default class MainContainer extends React.Component {
  static propTypes = {
    enableBreadcrumbs: React.PropTypes.bool,
    enableSettings: React.PropTypes.bool,
    sidebarShortcuts: React.PropTypes.array,
    sidebarNavList: React.PropTypes.array
  };

  render() {
      return (
          <div className="main-container" id="main-container">
              <div id="sidebar" className="sidebar responsive">
                  
                  <SideBarShortcuts />
                  <SideBarNavList items={this.props.sidebarNavList}/>
                  <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                      <i className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                  </div>
              </div>
              <div className="main-content">
                <div className="main-content-inner">
                  {this.props.enableBreadcrumbs ? <Breadcrumbs /> : null}
                  <div className="page-content">
                    {this.props.enableSettings ? <Settings /> : null}
                    {this.props.children}
                  </div>
                </div>
              </div>
              <Footer />
          </div>
        );
  }
}