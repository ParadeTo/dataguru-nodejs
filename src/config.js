"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (set, get, has) {
  // 服务器监听端口
  set('web.port', 3000);
  // session secret
  set('web.session.secret','ayou');
  // Redis
  set('web.session.redis', {
    host: '127.0.0.1',
    port: 6379
  });
  // limiter redis connection
  set('limiter.redis', {
    host: '127.0.0.1',
    port: 6379,
    prefix: ''
  });
  // captcha redis connection
  set('captcha.redis', {
    host: '127.0.0.1',
    port: 6379,
    prefix: ''
  })
}
