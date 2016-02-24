
import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';



import NavBar from '../../containers/NavBar';
// import MainContainer from '../Ace/MainContainer';
import MainContainer from '../../containers/MainContainer';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static defaultProps = {
    context: {
      insertCss: () => {}
    }
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    this.removeCss = this.props.context.insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }


  render() {
    

    return !this.props.error ? (
      <div>
        <NavBar/>
        <MainContainer>
          {this.props.children}
        </MainContainer>
        </div>
    ) : this.props.children;
  }

}

export default App;
