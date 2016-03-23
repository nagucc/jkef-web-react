/*
  使用Ace Admin Template的SideBar组件
  items属性用于描述sidebar的项目数据，它是一个数组，数组的每个元素必须包括以下属性：
  - title 显示的名称
  - target 超链接地址
  - icon 使用的图标。不包括"fa-"
  - subItems 子栏目
*/


import React, { Component } from 'react';

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
                            <a href={item.target || '#'} className={item.subItems && item.subItems.length ? 'dropdown-toggle' : ''}>
                                <i className={`menu-icon fa fa-${item.icon || 'tachometer'}`}></i>
                                <span className="menu-text"> {item.title} </span>
                                  {
                                    item.subItems && item.subItems.length
                                    ? <b className="arrow fa fa-angle-down"></b> : null
                                  }
                            </a>


                            <b className="arrow"></b>
                            {
                              item.subItems
                              ? (<ul className="submenu">
                                {
                                  item.subItems.map((sub, i) => {
                                    return (
                                      <li key={i}>
                                        <a href={sub.target} >
                                          <i className="menu-icon fa fa-caret-right" ></i>
                                          {sub.title}
                                        </a>
                                        <b className="arrow"></b>
                                      </li>
                                    );
                                  })
                                }
                              </ul>) : null
                            }
                        </li>
                    )
                })
            }
        </ul>
    );
  }

}

export default SideBarNavList;
