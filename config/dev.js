"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (set, get, has) {
  set('web.port', 3001);
  set('db.mongodb','mongodb://127.0.0.1/dataguru-nodejs');

  set('smtp.host', 'smtp.qq.com');
  set('smtp.secureConnection', true);
  set('smtp.port', 465);
  set('smtp.auth.user', 'youxingzhi@qq.com');
  set('smtp.auth.pass', 'Woshiyxz12');
  set('smtp.debug', true);

  set('github.clientID', '8ea54e896465d2fa44b6');
  set('github.clientSecret', '3d8e3debbc4cfeb628ca4af7bdb1ae01c8cb7e3e');
  set('github.callbackURL', 'http://127.0.0.1:3000/auth/github');
};
