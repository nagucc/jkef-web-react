/*
  使用Ace Admin Template的SideBarShoutcuts组件
  Shortcuts一个数组，描述一组待显示的图标按钮，每个按钮包括以下属性：
    - btnType 按钮的css类型，例如btn-primary等。
    - link 按钮指向的地址
    - icon 按钮使用的图标例如pencil等。
*/


import React, { Component } from 'react';

class SideBarShortcuts extends Component {
  constractor () {
  }

  static defaultProps = {
    sidebarShortcuts: []
  }

  static propTypes = {
    sidebarShortcuts: React.PropTypes.array,
  }

  render() {
    return this.props.sidebarShortcuts.length ? (
    	<div className="sidebar-shortcuts" id="sidebar-shortcuts">
            <div className="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            {
              this.props.sidebarShortcuts.map((sc, i) => {
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
    ) : null;
  }

}

export default SideBarShortcuts;
