/*
  使用Ace Admin Template的SideBar组件
*/


import React, { Component } from 'react';
import {sidebarItems} from '../../config';

class SideBarNavList extends Component {
  render() {
    return (
    	<ul className="nav nav-list">
            {
                sidebarItems.map((item, i) => {
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
