/*
  使用Ace Admin Template的SideBar组件
*/


import React, { Component } from 'react';

class SideBarNavList extends Component {


  render() {
    return (
    	<ul className="nav nav-list">
            <li className="">
                <a href="index.html">
                    <i className="menu-icon fa fa-tachometer"></i>
                    <span className="menu-text"> Dashboard </span>
                </a>

                <b className="arrow"></b>
            </li>

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
