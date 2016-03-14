/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import {siteProfile} from './config';
import fetch from './core/fetch';
import JkefApp from './containers/Jkef/App';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import ReadingRoom from './containers/ReadingRoom';
import JkefIndex from './components/Jkef/Index';

import Stat from './containers/Jkef/Stat';
import Projects from './containers/Projects';
import Acceptors from './containers/Acceptors/Index';
import Detail from './containers/Acceptors/Detail';
import Edit from './containers/Acceptors/Edit';
import AcceptorRecordEdit from './components/Jkef/Acceptors/Record/Edit';
import WxSignup from './components/Nagu/WxSignup';

import {store} from './redux/store';
import reducers from './redux/reducers';
import {showIndex, showBookList, fetchNgvBooks,
  showNgvReadingRoom, showJkefProjects, showStat,
  showAcceptors, showAcceptorDetail,
  newAcceptor } from './redux/actions';

var fetchJson = async function (url, options) {
    const res = await fetch(url, options);
    return await res.json();
};
const jkefRouter = new Router(on => {

  on('/wx-ent/signup', async (state, next) => {
    var signup = <WxSignup />;
    var props = {
      context: state.context,
      enableUserInfo: false
    };
    return <App {...props}> {signup} </App>;
  });

  // 首页
  on('/', () => {
    store.dispatch(showIndex());
    return <JkefApp><JkefIndex /></JkefApp>;
  });

  on('/stat', () => {
    store.dispatch(showStat());
    return <JkefApp><Stat /></JkefApp>;
  });

  on('/projects', async () => {
    store.dispatch(showJkefProjects());
    return <JkefApp><Projects /></JkefApp>;
  });

  // 电子阅览室
  on('/reading-room', async () => {
    store.dispatch(showNgvReadingRoom());
    return <JkefApp><ReadingRoom /></JkefApp>;
  });

  // 受赠者－首页
  on('/acceptors', async () => {
    store.dispatch(showAcceptors());
    return <JkefApp><Acceptors /></JkefApp>;
  });

  // 捐赠管理 - 受赠者详情
  on('/acceptors/detail/:id', async(req) => {
    store.dispatch(showAcceptorDetail(req.params.id));
    return <JkefApp><Detail /></JkefApp>;
  });

  on('/acceptors/new', async(req) => {
    store.dispatch(newAcceptor());
    return <JkefApp><Edit /></JkefApp>;
  });

  on('/acceptors/:id/records/new', async (req) => {
    var acceptor = await fetchJson(`/api/jkef/acceptors/${req.params.id}`);
    var props = {
      enableSideBarShortcuts: true,
      shortcuts: shortcuts
    };
    return (
      <App {...props}>
        <AcceptorRecordEdit acceptorId={acceptor.data._id} name={acceptor.data.name} />
      </App>
      );
  });

  // 以下所有页面都使用默认App组件进行框架包裹
  on('*', async (state, next) => {

    const component = await next();
    var props = {
      context: state.context,
      loginUrl: await fetchJson(`/api/auth/wx-ent/url?redirect_uri=${state.path}`)
    };
    return component && <App {...props}>{component}</App>;
  });



  on('/acceptors/edit/:id', async(req) => {
    var acceptor = await fetchJson(`/api/jkef/acceptors/${req.params.id}`);
    return <Edit {...acceptor.data} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

var routers = {
  'jkef': jkefRouter,
  'gdzc': require('./routers/gdzc')
};


export default routers[siteProfile];
