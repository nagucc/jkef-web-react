
import React from 'react';
import Router from 'react-routing/src/Router';
import App from '../containers/App';
import NotFoundPage from '../components/NotFoundPage';
import ErrorPage from '../components/ErrorPage';

import Index from '../containers/Gdzc/Index';
import StatByYear from '../containers/Gdzc/StatByYear';

import {store} from '../redux/store';
import reducers from '../redux/reducers';
import {showIndex, showStat} from '../redux/actions';

export default new Router(on => {

  // 以下所有页面都使用默认App组件进行框架包裹
  on('*', async (state, next) => {
    const component = await next();
    return component && <App>{component}</App>;
  });



  on('/', async() => {
    store.dispatch(showIndex());
    return <Index />;
  });

  on('/stat/byYear', async() =>{
    store.dispatch(showStat());
    return <StatByYear />;
  })

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});
