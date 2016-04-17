
import React from 'react';
import Router from 'react-routing/src/Router';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import Upload from './containers/Upload';

import Index from './containers/Index';
import StatByYear from './containers/StatByYear';
import DxsbStatByYear from './containers/DxsbStatByYear';
import ScrapingStatByYear from './containers/ScrapingStatByYear';

import List from './containers/List';
import Detail from './containers/Detail';

import StatByLyr from './containers/StatByLyr';
import DxsbStatByLyr from './containers/DxsbStatByLyr';
import ScrapingStatByLyr from './containers/ScrapingStatByLyr';

import {store} from './redux/store';
import reducers from './redux/reducers';
import {showIndex, showStat, showUpload} from './redux/actions';
import {showList, setItemsFilter, showDetail, fetchItem} from './redux/actions';
import * as actions from './redux/actions';
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

  /*
  按年统计数据
   */
  on('/stat/byYear', async() =>{
    store.dispatch(showStat());
    return <StatByYear />;
  });

  on('/stat/byLyr', async () => {
    return <StatByLyr />;
  })

  /*
  大型设备按年统计数据
   */
  on('/statDxsb/byYear', async() =>{
    store.dispatch(showStat());
    return <DxsbStatByYear />;
  });

  /*
  待报废资产设备按年统计数据
   */
  on('/statScraping/byYear', async() =>{
    store.dispatch(showStat());
    return <ScrapingStatByYear />;
  });

  on('/statDxsb/byLyr', async () => <DxsbStatByLyr />);

  on('/statScraping/byLyr', async () => <ScrapingStatByLyr />);
  /*
  根据查询条件显示固定资产条目
   */
  on('/items', async (req) => {
    store.dispatch(setItemsFilter(req.query))
    store.dispatch(showList());
    return <List />;
  });

  /*
  显示固定资产详细信息
  */
  on('/item/:bqh', async (req) => {
    store.dispatch(fetchItem(req.params.bqh));
    return <Detail />;
  })

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
