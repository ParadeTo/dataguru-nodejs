"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 * project-core的作用类似如下代码:
 * async.series([
 *  function(next) {
 *    //...
 *    next();
 *  },
 *  function(next) {
 *    //...
*     next();
*   },
*   require('xxxxx.js') // xxxxx.js: module.exports = function(next){}
 * ],function(){
 *  console.log('done')
 * })
 */
import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();

// 创建debug函数
$.createDebug = function(name) {
  return createDebug('my:' + name);
}
const debug = $.createDebug('server');

// 加载配置文件
$.init.add((done) => {
  try {
    $.config.load(path.resolve(__dirname, 'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env) {
      debug('load env: %s', env);
      $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }
    $.env = env;
    done();
  } catch (err) {
    err.msg = '配置文件格式不正确';
    done(err);
  }
});

// 初始化mongodb
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));

// 初始化limiter
$.init.load(path.resolve(__dirname, 'init', 'limiter.js'));

// 初始化captcha
$.init.load(path.resolve(__dirname, 'init', 'captcha.js'));

// 加载models
$.init.load(path.resolve(__dirname, 'models'));

// 加载methods
$.init.load(path.resolve(__dirname, 'methods'));

// 初始化express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));

// 初始化中间件
$.init.load(path.resolve(__dirname, './middlewares'));

// 加载路由
$.init.load(path.resolve(__dirname, './routes'));

// 初始化
$.init((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log('inited ',$.env);
    // require('./test');
  }
})
