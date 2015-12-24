/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component, PropTypes } from 'react';
import NavBar from '../Ace/NavBar';
import MainContainer from '../Ace/MainContainer';

class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div>
        <NavBar />
        <MainContainer>
          {this.props.children}
        </MainContainer>
      </div>
    );
  }

}

export default Layout;
