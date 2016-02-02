/*
  使用Ace Admin Template的SideBar组件
*/


import React, { Component } from 'react';

class SideBarShortcuts extends Component {
  constractor () {
  }

  static defaultProps = {
    shortcuts: []
  }
  render() {
    return (
    	<div className="sidebar-shortcuts" id="sidebar-shortcuts">
            <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            {
              this.props.shortcuts.map((sc, i) => {
                return (
                  <a className={`btn ${sc.btnType}`} key={i} href={sc.link}>
                    <i className={`ace-icon fa fa-${sc.icon}`}></i>
                  </a>
                )
              })
            }
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
