"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import path from 'path'
import ProjectCore from 'project-core'
import createDebug from 'debug'

const $ = global.$ = new ProjectCore()

// 创建debug函数
$.createDebug = function(name) {
  return createDebug('my:' + name)
}
const debug = $.createDebug('server')

// 加载配置文件
$.init.add((done) => {
  $.config.load(path.resolve(__dirname, 'config.js'))
  const env = process.env.NODE_ENV || null
  if (env) {
    debug('load env: %s', env)
    $.config.load(path.resolve(__dirname, '../config', env + '.js'))
  }
  $.env = env
  done();
})

// 初始化mongodb
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'))

// 加载models
$.init.load(path.resolve(__dirname, 'models'))

// 初始化express
$.init.load(path.resolve(__dirname, 'init', 'express.js'))

// 加载路由
$.init.load(path.resolve(__dirname, '../routes'))

// 初始化
$.init((err) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  } else {
    console.log('inited ',$.env)
  }
})
