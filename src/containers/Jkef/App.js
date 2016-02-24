import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import app from '../../redux/reducers';
import RawApp from '../../components/App';

export default class App extends React.Component {
  render() {
  	let store = createStore(app);
    return (
      <Provider store={store}>
      	<RawApp>{this.props.children}</RawApp>
      </Provider>
    );
  }
}