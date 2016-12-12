"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import validator from 'validator';

module.exports = function (done) {
  $.checkLogin = function (req, res, next) {
    if (!(req.session.user && req.session.user._id)) return next(new Error('please login firstly'));
    next();
  }

  done();
};
