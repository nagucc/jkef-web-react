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
    render: function() {
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
                
                <div className="main-content">
                    <div className="main-content-inner">
                        {breadcrumbs}
                        <div className="page-content">
                            {settings}

                            <div className="row">
                                <div className="col-xs-12">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        );
    }

});

module.exports = MainContainer;