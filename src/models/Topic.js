"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */
import mongoose from 'mongoose';

module.exports = function (done) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  var Topic = new Schema({
    author: {type: ObjectId, index: true, ref: 'User'},
    title: {type: String, trim: true},
    content: {type: String},
    tags: [{type: String, index: true}],
    createdAt: {type: Date, index: true},
    updatedAt: {type: Date, index: true},
    lastCommentedAt: {type: Date, index: true},
    comments: [{ // 子文档会自动加上_id属性
      author: {type: ObjectId, ref: 'User'},
      authorNickname: String,
      content: String,
      createdAt: Date
    }],
    pageView: {type: Number}
  });

  $.mongodb.model('Topic', Topic);
  $.model.Topic = $.mongodb.model('Topic');

  done();
}
