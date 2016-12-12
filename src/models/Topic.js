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
    authorId: {type: ObjectId, index: true},
    title: {type: String, trim: true},
    content: {type: String},
    tags: [{type: String, index: true}],
    createdAt: {type: Date, index: true},
    updatedAt: {type: Date, index: true},
    lastCommentedAt: {type: Date, index: true},
    comments: [{
      cid: ObjectId,
      authorId: ObjectId,
      content: String,
      createdAt: Date
    }]
  });

  $.mongodb.model('Topic', Topic);
  $.model.Topic = $.mongodb.model('Topic');

  done();
}
