"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import validator from 'validator';

module.exports = function (done) {
  $.method('user.add').check({
    name: {required: true, validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {required: true, validator: (v) => validator.isEmail(v)},
    password: {required: true, validate: (v) => validator.isLength(v,{min: 6})}
  });

  $.method('user.add').register(async function (params, callback) {
    params.name = params.name.toLowerCase();
    // 块级作用域
    {
      const user = await $.method('user.get').call({name: params.name});
      if (user) return callback(new Error(`user ${params.name} already exists`));
    }
    {
      const user = await $.method('user.get').call({email: params.email});
      if (user) return callback(new Error(`user ${params.email} already exists`));
    }

    params.password = $.utils.encryptPassword(params.password.toString());
    const user = new $.model.User(params);
    user.save(callback)

  });

  $.method('user.get').register(async function (params, callback) {
    const query = {};
    if (params._id) {
      query._id = params._id
    } else if (params.name) {
      query.name = params.name;
    } else if (params.email) {
      query.email = params.email;
    } else {
      return callback(new Error('missing parameter _id|name|email'));
    }
  });

  done();
}
