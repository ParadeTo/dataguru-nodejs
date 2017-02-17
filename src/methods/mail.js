"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import path from 'path';
import fs from 'fs';
import rd from 'rd';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

module.exports = function (done) {
  // 开启一个 SMTP 连接池
  // var smtpTransport = nodemailer.createTransport("SMTP",{
  //   host: "smtp.qq.com", // 主机
  //   secureConnection: true, // 使用 SSL
  //   port: 465, // SMTP 端口
  //   auth: {
  //     user: "youxingzhi@qq.com", // 账号
  //     pass: "Woshiyxz12" // 密码
  //   }
  // });
  // // 设置邮件内容
  // var mailOptions = {
  //   from: "ayou <youxingzhi@qq.com>", // 发件地址
  //   to: params.email, // 收件列表
  //   subject: "注册成功", // 标题
  //   html: "您已注册成功，<a href='http://localhost:3000'>点击登录</a>" // html 内容
  // }
  // 开启一个 SMTP 连接池
  $.smtp = nodemailer.createTransport('SMTP', {
    host: "smtp.qq.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: "youxingzhi@qq.com", // 账号
      pass: "Woshiyxz12" // 密码
    }
  });

  const templates = {};
  rd.eachFileFilterSync(path.resolve(__dirname, '../../email_templates'), /\.html$/, (f, s) => {
    const name = path.basename(f, '.html');
    const html = fs.readFileSync(f).toString();
    templates[name] = ejs.compile(html);
  });

  $.method('mail.send').check({
    to: {required: true},
    subject: {required: true},
    html: {required: true}
  });

  $.method('mail.send').register(async function (params) {
    params.from = $.config.get('smtp.auth.user');
    $.smtp.sendMail(params, console.log);
  });

  $.method('mail.sendTemplate').check({
    to: {required: true},
    subject: {required: true},
    template: {required: true}
  });

  $.method('mail.sendTemplate').register(async function (params) {
    params.from = $.config.get('smtp.auth.user');
    const fn = templates[params.template];
    if (!fn) throw new Error('invalid email template');
    const html = fn(params.data || {});
    return $.method('mail.send').call({
      to: params.to,
      subject: params.subject,
      html: html
    });
  });

  done();
};
