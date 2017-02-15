"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import validator from 'validator';
import nodemailer from 'nodemailer';

module.exports = function (done) {
  $.method('user.add').check({
    name: {required: true, validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {required: true, validator: (v) => validator.isEmail(v)},
    password: {required: true, validate: (v) => validator.isLength(v,{min: 6})}
  });

  $.method('user.add').register(async function (params) {
    params.name = params.name.toLowerCase();
    // 块级作用域
    {
      const user = await $.method('user.get').call({name: params.name});
      if (user) throw new Error(`user ${params.name} already exists`);
    }
    {
      const user = await $.method('user.get').call({email: params.email});
      if (user) throw new Error(`user ${params.email} already exists`);
    }

    params.password = $.utils.encryptPassword(params.password.toString());
    const user = new $.model.User({
      name: params.name,
      email: params.email,
      nickname: params.nickname,
      password: params.password,
      about: params.about
    });
    return user.save(); // async 函数中直接拿到结果
  });

  $.method('user.get').check({
    _id: {validate: (v) => validator.isMongoId(String(v))},
    name: {validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {validator: (v) => validator.isEmail(v)},
  });

  $.method('user.get').register(async function (params) {
    const query = {};
    if (params._id) {
      query._id = params._id
    } else if (params.name) {
      query.name = params.name;
    } else if (params.email) {
      query.email = params.email;
    } else {
      throw new Error('missing parameter _id|name|email');
    }
    return $.model.User.findOne(query);
  });

  $.method('user.update').check({
    _id: {validate: (v) => validator.isMongoId(v)},
    name: {validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {validator: (v) => validator.isEmail(v)},
  });

  $.method('user.update').register(async function (params) {
    const user = await $.method('user.get').call(params);
    if (!user) {
      throw new Error('user does not exists');
    }

    const update = {};
    if (params.name && user.name !== params.name) {
      update.name = params.name;
    }
    if (params.email && user.email !== params.email) {
      update.email = params.email;
    }
    if (params.password) {
      update.password = params.password;
    }
    if (params.nickname) {
      update.nickname = params.nickname;
    }
    if (params.about) {
      update.about = params.about;
    }

    return $.model.User.update({_id:user._id}, {$set: update});
  });

  $.method('user.incrScore').check({
    _id: {validate: (v) => validator.isMongoId(v), required: true},
    score: {validate: (v) => !isNaN(v), required: true}
  });

  $.method('user.incrScore').register(async function (params) {

    return $.model.User.update({_id: params._id}, {$inc: {score: params.score}});
  });

  $.method('user.sendEmail').check({
    email: {required: true, validator: (v) => validator.isEmail(v)}
  });

  $.method('user.sendEmail').register(async function (params) {
    // 开启一个 SMTP 连接池
    var smtpTransport = nodemailer.createTransport("SMTP",{
      host: "smtp.qq.com", // 主机
      secureConnection: true, // 使用 SSL
      port: 465, // SMTP 端口
      auth: {
        user: "youxingzhi@qq.com", // 账号
        pass: "Woshiyxz12" // 密码
      }
    });
    // 设置邮件内容
    var mailOptions = {
      from: "ayou <youxingzhi@qq.com>", // 发件地址
      to: params.email, // 收件列表
      subject: "注册成功", // 标题
      html: "您已注册成功，<a href='http://localhost:3000'>点击登录</a>" // html 内容
    }
    // 发送邮件
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
      smtpTransport.close(); // 如果没用，关闭连接池
    });

  });


  done();
}
