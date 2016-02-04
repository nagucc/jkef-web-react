/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';

class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    return (
<html lang="en">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charSet="utf-8" />
    <title>{this.props.title}</title>

    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <link rel="stylesheet" href="/assets/css/bootstrap.css" />
    <link rel="stylesheet" href="/assets/css/font-awesome.css" />

    

    <link rel="stylesheet" href="/assets/css/ace-fonts.css" />

    <link rel="stylesheet" href="/assets/css/ace.css" className="ace-main-stylesheet" id="main-ace-style" />

    <script src="/assets/js/ace-extra.js"></script>

  </head>
  <body className="no-skin">
    <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }}/>
    
    <script src='/assets/js/jquery.js'></script>
    <script src="/assets/js/bootstrap.js"></script>


    <script src="/assets/js/ace/ace.js"></script>
    <script src="/assets/js/ace/ace.sidebar.js"></script>
    <script src="/assets/js/ace/ace.sidebar-scroll-1.js"></script>
    <script src="/assets/js/ace/ace.submenu-hover.js"></script>
    <script src="/assets/js/ace/ace.widget-box.js"></script>
    <script src="/assets/js/ace/ace.widget-on-reload.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>

    <script src={this.props.entry}></script>
  </body>
</html>
    );
  }

}

export default Html;
