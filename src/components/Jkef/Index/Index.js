/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';

export default class extends Component {

	constructor(props) {
        super(props);
    }

	static defaultProps = {
		enableBreadcrumbs: false,
        enableSettings: false 
	}

  render() {
  	var breadcrumbs = null;
    if(this.props.enableBreadcrumbs) breadcrumbs = <Breadcrumbs />;

    var settings = null;
    if(this.props.enableSettings) settings = <Settings />;

    return (
    	<div className="main-content">
            <div className="main-content-inner">
                {breadcrumbs}
                <div className="page-content">
                    {settings}

                    <div className="row">
                    	<h3 className="header blue smaller">在纳谷社区微信关注我们</h3>
                        <div className="col-xs-12">
                            <img className="img-responsive center-block" src="nagusq.jpg" alt="家琨教育基金微信" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

}
