"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import mongoose from 'mongoose';

module.exports = function (done) {
  const debug = $.createDebug('init:mongodb');
  debug('connecting to MongoDB...');

  mongoose.Promise = require('bluebird');

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};
  done();
}
