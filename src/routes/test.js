"use strict"
/**
 * 代理
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

import path from 'path';

module.exports = function (done) {
  $.router.get('*', function(req, res, next) {
    if (req.url.indexOf('/api/') > -1) {
      next();
    } else {
      res.sendFile(path.resolve(__dirname, '../../client/app/index.html'));
    }
  });
  done();
}
