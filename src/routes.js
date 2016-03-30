
import React from 'react';
import Router from 'react-routing/src/Router';
import App from './containers/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import Upload from './containers/Upload';

import {store} from './redux/store';
import reducers from './redux/reducers';
import {showIndex, showStat, showUpload} from './redux/actions';
import {showList} from './redux/actions';

export default new Router(on => {

  // 以下所有页面都使用默认App组件进行框架包裹
  on('*', async (state, next) => {
    const component = await next();
    return component && <App>{component}</App>;
  });


  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});
