/*
  使用Ace Admin Template的SideBar组件
  items属性用于描述sidebar的项目数据，它是一个数组，数组的每个元素必须包括以下属性：
  - title 显示的名称
  - target 超链接地址
  - icon 使用的图标。不包括"fa-"
*/


import React, { Component } from 'react';
import {sidebarItems} from '../../config';

class SideBarNavList extends Component {
  static propTypes = {
    items: React.PropTypes.array
  };
  render() {
    return (
    	<ul className="nav nav-list">
            {
                this.props.items.map((item, i) => {
                    return (
                        <li className="" key={i}>
                            <a href={item.target}>
                                <i className={`menu-icon fa fa-${item.icon || 'tachometer'}`}></i>
                                <span className="menu-text"> {item.title} </span>
                            </a>

                            <b className="arrow"></b>
                        </li>
                    )
                })
            }
        </ul>
    );
  }

}

export default SideBarNavList;
