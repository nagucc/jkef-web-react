/*
  使用Ace Admin Template的SideBar组件
*/


import React, { Component } from 'react';

class SideBarShortcuts extends Component {


  render() {
    return (
    	<div className="sidebar-shortcuts" id="sidebar-shortcuts">
            <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
                <button className="btn btn-success">
                    <i className="ace-icon fa fa-signal"></i>
                </button>

                <button className="btn btn-info">
                    <i className="ace-icon fa fa-pencil"></i>
                </button>

                <button className="btn btn-warning">
                    <i className="ace-icon fa fa-users"></i>
                </button>

                <button className="btn btn-danger">
                    <i className="ace-icon fa fa-cogs"></i>
                </button>

            </div>

            <div className="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
                <span className="btn btn-success"></span>

                <span className="btn btn-info"></span>

                <span className="btn btn-warning"></span>

                <span className="btn btn-danger"></span>
            </div>
        </div>
    );
  }

}

export default SideBarShortcuts;
