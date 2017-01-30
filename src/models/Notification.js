"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import mongoose from 'mongoose';

module.exports = function (done) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var Notification = new Schema({
    from: {type: ObjectId, index: true, ref: 'User'},
    to: {type: ObjectId, index: true, ref: 'User'},
    type: {type: String},
    data: {type: Object},
    createdAt: {type: Date},
    isRead: {type: Boolean},
    readAt: {type: Date}
  });

  $.mongodb.model('Notification', Notification);
  $.model.Notification = $.mongodb.model('Notification');

  done();
}
