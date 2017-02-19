"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (done) {

  $.router.post('/api/user/profile', $.checkLogin, async function (req, res, next) {

    const update = {
      _id: req.session.user._id
    };
    if ('email' in req.body) update.email = req.body.email;
    if ('nickname' in req.body) update.nickname = req.body.nickname;
    if ('about' in req.body) update.about = req.body.about;

    const ret = await $.method('user.update').call(update);
    const user = await $.method('user.get').call({_id: req.session.user._id.toString()});
    req.session.user.email = user.email;
    req.session.user.nickname = user.nickname;
    req.session.user.about = user.about;

    res.apiSuccess(user);
  });

  $.router.post('/api/user/request_reset_password', async function (req, res, next) {
    if (!req.body.email) {
      return next(new Error('missing parameter email'));
    }

    const user = await $.method('user.get').call({email: req.body.email});
    if (!user) {
      return next(new Error(`user ${req.body.email} does not exist`));
    }

    const ttl = 3600;
    const code = await $.captcha.generate({
      type: 'reset_password',
      email: req.body.email
    }, ttl);

    await $.method('mail.sendTemplate').call({
      to: req.body.email,
      subject: '重置密码',
      template: 'reset_password',
      data: {code, ttl}
    }, console.log);

    res.apiSuccess({email: req.body.email});
  });

  $.router.post('/api/user/reset_password', async function (req, res, next) {
    if (!req.body.email) {
      return next(new Error('missing parameter email'));
    }
    if (!req.body.password) {
      return next(new Error('missing parameter password'));
    }
    if (!req.body.code) {
      return next(new Error('missing parameter code'));
    }

    const user = await $.method('user.get').call({email: req.body.email});
    if (!user) {
      return next(new Error(`user ${req.body.email} does not exist`));
    }

    const data = await $.captcha.get(req.body.code);
    if(!data) return next(new Error(`invalid captcha code ${req.body.code}`));
    if(data.type !== 'reset_password') return next(new Error(`invalid captcha code ${req.body.code} type`));
    if(data.email !== req.body.email) return next(new Error(`invalid captcha code ${req.body.code} email`));

    const ret = await $.method('user.update').call({
      _id: user._id,
      password: req.body.password
    });

    res.apiSuccess({email: req.body.email});
  });

  $.router.post('/api/user/unbind', $.checkLogin, async function (req, res, next) {

    delete req.session.user.githubUsername;

    const ret = await $.method('user.del').call({
      _id: req.session.user._id,
      githubUsername: 1
    });

    res.apiSuccess({});
  });

  done();
};
