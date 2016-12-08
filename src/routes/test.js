"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (done) {
  $.router.get('/', function (req, res, next) {
    res.set('Content-Type','text/html;charset=utf-8')
    res.end('hello world, 你好世界')
  })
};
