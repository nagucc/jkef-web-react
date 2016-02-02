/*
  使用Ace Admin Template的MainContainer组件
*/


import SideBarShortcuts from './SideBarShortcuts';
import SideBarNavList from './SideBarNavList';
import Settings from './Settings';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import {enableBreadcrumbs, enableSettings} from '../../config';

var React = require('react');

var MainContainer = React.createClass({
    getInitialState: function() {
        return {
            enableBreadcrumbs: enableBreadcrumbs,
            enableSettings: enableSettings 
        };
    },
    getDefaultProps: function() {
        return {
            enableSideBarShortcuts: false
        };
    },
    render: function() {
        var breadcrumbs = null;
        if(this.state.enableBreadcrumbs) breadcrumbs = <Breadcrumbs {...this.props} />;

        var settings = null;
        if(this.state.enableSettings) settings = <Settings />;

        var sidebarShortcuts = null;
        if(this.props.enableSideBarShortcuts) sidebarShortcuts = <SideBarShortcuts {...this.props} />;

        return (
            <div className="main-container" id="main-container">
                <div id="sidebar" className="sidebar responsive">
                    
                    {sidebarShortcuts}
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

});

module.exports = MainContainer;