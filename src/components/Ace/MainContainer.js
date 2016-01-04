/*
  使用Ace Admin Template的MainContainer组件
*/


import React, { Component } from 'react';
import SideBarShortcuts from './SideBarShortcuts';
import SideBarNavList from './SideBarNavList';
import Settings from './Settings';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

class MainContainer extends Component {
  render() {
    return (
        <div className="main-container" id="main-container">
            <div id="sidebar" className="sidebar responsive">
                
                <SideBarShortcuts />
                <SideBarNavList />

                <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
                    <i className="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
                </div>
            </div>

            <div className="main-content">
                <div className="main-content-inner">
                    <Breadcrumbs />

                    <div className="page-content">
                        <Settings />

                        <div className="row">
                            <div className="col-xs-12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
  }

}

export default MainContainer;
