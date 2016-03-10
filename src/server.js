
import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port, title, redisConfig } from './config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';

var RedisStore = require('connect-redis')(session);


const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser('jkef.nagu.cc cookie key'));
server.use(session({
  store: new RedisStore({
    host: redisConfig.host,
    port: redisConfig.port
  }),
  secret: 'jkef.nagu.cc session key',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
server.use(morgan('dev'));
//
// Register API middleware
// -----------------------------------------------------------------------------

// 连接mongoose
require('./api/mongoose');

server.use('/api/auth/wx-ent', require('./api/auth/wx-ent'));
server.use('/api/jkef/acceptors', require('./api/jkef/acceptors'));
server.use('/api/jkef/stat', require('./api/jkef/stat'));
server.use('/api/wx-ent/signup', require('./api/wx-ent/signup'));

// 开始执行后台操作
require('./api/gdzc/worker');
server.use('/api/gdzc', require('./api/gdzc/rest'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: title, description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
