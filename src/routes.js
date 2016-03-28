
import React from 'react';
import Router from 'react-routing/src/Router';
import App from './containers/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import Upload from './containers/Upload';

import Index from './containers/Gdzc/Index';
import StatByYear from './containers/Gdzc/StatByYear';
import List from './containers/Gdzc/List';

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



  on('/', async() => {
    store.dispatch(showIndex());
    return <Index />;
  });

  on('/stat/byYear', async() =>{
    store.dispatch(showStat());
    return <StatByYear />;
  });

  on('/items', async (req) => {
    store.dispatch(showList(req.query));
    return <List />;
  });

  on('/merge-xls', async () => {
    store.dispatch(showUpload({
      title: '上传数据',
      label: '请Excel格式(.xls/.xlsx)的资产数据文件',
      help: '资产数据文件可从学校资产管理系统中导出，导出时，请选择全部字段。'
    }));
    return <Upload />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});
