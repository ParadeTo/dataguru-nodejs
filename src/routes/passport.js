"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github';

module.exports = function (done) {

  passport.use(new GitHubStrategy($.config.get('github'), function(accessToken, refreshToken, profile, cb) {
    $.method('user.get').call({githubUsername: profile.username}, (err, user) => {
      cb(err, {
        info: user,
        github: profile
      });
    });

  }));

  $.router.get('/auth/github', passport.authenticate('github', {session: false}), function(req, res) {
    if (req.user.info) {
      // 用户存在
      req.session.user = req.user.info;
      req.session.logout_token = $.utils.randomString(20);
      res.redirect('/');
    } else {
      // 用户不存在
      req.session.github_user = req.user.github;
      res.redirect('/login?bind=1');
    }
    res.send(req.user);
  });

  done();
};
