"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (set, get, has) {
  set('web.port', 3001);
  set('db.mongodb','mongodb://127.0.0.1/dataguru-nodejs');

}
