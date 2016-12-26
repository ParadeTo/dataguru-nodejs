"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

import path from 'path';

module.exports = function (done) {
  $.router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../client/app/index.html'));
  });
  done();
}
