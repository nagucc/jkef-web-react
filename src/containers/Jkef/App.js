import React from 'react';
import { Provider } from 'react-redux'
import {store} from '../../redux/store'
import RawApp from '../../components/App';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      	<RawApp>{this.props.children}</RawApp>
      </Provider>
    );
  }
}