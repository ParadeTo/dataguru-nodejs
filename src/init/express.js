"use strict";
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import session from 'express-session';
import _RedisStore from 'connect-redis';

const RedisStore = _RedisStore(session);

module.exports = function (done) {
  const debug = $.createDebug('init:express');
  debug('initing Express...');

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(multiparty());
  app.use(session({
    secret: $.config.get('web.session.secret'),
    store: new RedisStore($.config.get('web.session.redis'))
  }));

  const router = express.Router();

  const routerWrap = {};
  // express 不支持 async function, 这里对其进行处理
  // 不考虑多个函数，如果只有一个函数，是下面这样的
  // routerWrap[method] = function(path, fn) {
  //   fn = function (req, res, next) {
  //      const ret = fn(req, res, next);
  //      if (ret.catch) ret.catch(next);
  //   }
  //   router[method](path, fn);
  // }
  ['get','head','post','put','del','delete'].forEach(method => {
    routerWrap[method] = function (path, ...fnList) {// 不定参数
      fnList = fnList.map(fn => {
        return function (req, res, next) {
          const ret = fn(req, res, next); // 这里的fn是async function 返回promise对象
          if (ret && ret.catch) ret.catch(next); // 捕获异常
        };
      });
      router[method](path, ...fnList);
    };
  });
  $.router = routerWrap;

  app.use(function (req, res, next) {
    res.apiSuccess = function (data) {
      res.json({success: true, result: data});
    };
    next();
  });

  app.use(router);
  app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

  // 错误处理
  app.use('/api', function (err, req, res, next) {
    debug('Api error: %s', err && err.stack || err);
    res.json({error: err.toString()});
  })

  app.listen($.config.get('web.port'), err => {
    done(err);
  })

  done();
}
