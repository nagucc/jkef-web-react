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
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import ReadingRoom from './components/Jkef/ReadingRoom';
import JkefIndex from './components/Jkef/Index';
import Stat from './components/Jkef/Stat';
import Project from './components/Jkef/Projects';
import Acceptors from './components/Jkef/Acceptors';
import Detail from './components/Jkef/Acceptors/Detail';
import Edit from './components/Jkef/Acceptors/Edit';
import AcceptorRecordEdit from './components/Jkef/Acceptors/Record/Edit';
import WxSignup from './components/Nagu/WxSignup';

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
    return <App {...props}>{signup}</App>;
  });

  // 首页
  on('/', () => {
    var props = {
      enableUserInfo: false
    };
    return <App {...props}><JkefIndex /></App>;
  });

  on('/stat', () => {
    var props = {
      enableUserInfo: false
    };

    return <App {...props}><Stat /></App>;
  });

  on('/projects', () => {
    var props = {
      enableUserInfo: false
    };

    return <App {...props}><Project /></App>;
  });

  // 电子阅览室
  on('/reading-room', async () => {
    var props = {
      enableUserInfo: false
    };

    return <App {...props}><ReadingRoom /></App>;
  });

  // 捐赠管理页面中的侧边小图标
  var shortcuts = [{
    btnType: 'btn-primary',
    icon: 'users',
    link: '/acceptors'
  }, {
    btnType: 'btn-success',
    icon: 'plus',
    link: '/acceptors/new'
  }];

  // 受赠者－首页
  on('/acceptors', async () => {
    const res = await fetch('/api/jkef/acceptors/search?page=0&size=20');
    const content = await res.json();
    var res2 = await fetch('/api/jkef/acceptors/count');
    var count = await res2.json();
    var props = {
      acceptors: content.data,
      count: count.data,
      enableSideBarShortcuts: true,
      shortcuts: shortcuts
    };
    return content && <App {...props}><Acceptors  {...props} /></App>;
  });

  // 捐赠管理 - 受赠者详情
  on('/acceptors/detail/:id', async(req) => {
    var acceptor = await fetchJson(`/api/jkef/acceptors/${req.params.id}`);

    var props = {
      enableSideBarShortcuts: true,
      shortcuts: shortcuts
    };
    return <App {...props}><Detail {...acceptor.data} /></App>;
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
  })

  // 以下所有页面都使用默认App组件进行框架包裹
  on('*', async (state, next) => {

    const component = await next();
    var props = {
      context: state.context,
      loginUrl: await fetchJson(`/api/auth/wx-ent/url?redirect_uri=${state.path}`)
    };
    return component && <App {...props}>{component}</App>;
  });

  on('/acceptors/new', async(req) => {
    return <Edit />;
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
  'jkef': jkefRouter
};


export default routers[siteProfile];
