"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (done) {
  $.router.post('/api/login_user', async function (req, res, next) {
    res.apiSuccess({user: req.session.user});
  });


  $.router.post('/api/login', async function (req, res, next) {
    if (!req.body.password) return next(new Error('missing password'));

    // 登录失败次数限制
    const key = `login:${req.body.name}:${$.utils.date('Ymd')}`;
    {
      const limit = 5;
      const ok = await $.limiter.incr(key, limit);
      if (!ok) throw new Error('login fail out of limit');
    }

    const user = await $.method('user.get').call(req.body);
    if (!user) {
      return next(new Error('user does not exists'));
    }

    if (!$.utils.validatePassword(req.body.password, user.password)) {
      return next(new Error('incorrect password'));
    }

    req.session.user = user;
    req.session.logout_token = $.utils.randomString(20);

    res.apiSuccess({token: req.session.logout_token});
  });

  $.router.post('/api/logout', async function (req, res, next) {
    // if (req.session.logout_token && req.query.token !== req.session.logout_token) {
    //   return next(new Error('invalid token'));
    // }

    delete req.session.user;
    delete req.session.logout_token;

    res.apiSuccess({});
  });

  $.router.post('/api/signup', async function (req, res, next) {
    // 发布频率限制
    {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const key = `addtopic:${ip}:${$.utils.date('Ymd')}`;
      const limit = 2;
      const ok = await $.limiter.incr(key, limit);
      if (!ok) throw new Error('signup is too frequent');
    }
    const user = await $.method('user.add').call(req.body);

    res.apiSuccess({user: user});
  });

  done();
};
