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

            <li className="">
                <a href="#" className="dropdown-toggle">
                    <i className="menu-icon fa fa-desktop"></i>
                    <span className="menu-text">
                        UI &amp; Elements
                    </span>

                    <b className="arrow fa fa-angle-down"></b>
                </a>

                <b className="arrow"></b>

                <ul className="submenu">
                    <li className="">
                        <a href="#" className="dropdown-toggle">
                            <i className="menu-icon fa fa-caret-right"></i>

                            Layouts
                            <b className="arrow fa fa-angle-down"></b>
                        </a>

                        <b className="arrow"></b>

                        <ul className="submenu">
                            <li className="">
                                <a href="top-menu.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Top Menu
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="two-menu-1.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Two Menus 1
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="two-menu-2.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Two Menus 2
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="mobile-menu-1.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Default Mobile Menu
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="mobile-menu-2.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Mobile Menu 2
                                </a>

                                <b className="arrow"></b>
                            </li>

                            <li className="">
                                <a href="mobile-menu-3.html">
                                    <i className="menu-icon fa fa-caret-right"></i>
                                    Mobile Menu 3
                                </a>

                                <b className="arrow"></b>
                            </li>
                        </ul>
                    </li>

                    <li className="">
                        <a href="typography.html">
                            <i className="menu-icon fa fa-caret-right"></i>
                            Typography
                        </a>

                        <b className="arrow"></b>
                    </li>
                </ul>
            </li>
        </ul>
    );
  }

}

export default SideBarNavList;
