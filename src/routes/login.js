"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (done) {
  $.router.post('/api/login', async function (req, res, next) {

    if (!req.body.password) return next(new Error('missing password'));
    console.log(req.body);
    $.method('user.get').call(req.body,console.log);
    // console.log(user);
    // if (!user) {
    //   return next(new Error('user does not exists'));
    // }
    //
    // if (!$.utils.validatePassword(req.body.password, user.password)) {
    //   return next(new Error('incorrect password'));
    // }
    //
    // res.json({success: true});
  });

  $.router.post('/api/logout', async function (req, res, next) {

  });

  $.router.post('/api/signup', async function (req, res, next) {

  });
};
