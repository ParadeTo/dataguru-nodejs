"use strict"
/**
 * pratice Nodejs project
 * @author ayou <youxingzhi@qq.com>
 */

module.exports = function (done) {
  // 增加帖子
  $.router.post('/api/topic/add', $.checkLogin, async function (req, res, next) {
    req.body.author = req.session.user._id;

    if ('tags' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }
    // 得到倒数第二篇帖子
    const nextToLast = await $.method('topic.nextToLast').call({userId:req.session.user._id.toString()});
    if (nextToLast && (new Date - lastOne.createdAt) < 1 * 3600 * 1000) return next(new Error('operation is too frequent'));
    const topic = await $.method('topic.add').call(req.body);

    res.apiSuccess({topic});
  });

  // 帖子列表
  $.router.get('/api/topic/list', async function (req, res, next) {
    if ('tags' in req.query) {
      req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    let page = parseInt(req.query.page, 10);
    if (!(page > 1)) page = 1;
    req.query.limit = 5;
    req.query.skip = (page - 1) * req.query.limit;

    const list = await $.method('topic.list').call(req.query);

    const count = await $.method('topic.count').call(req.query);

    const pageSize = Math.ceil(count / req.query.limit);

    res.apiSuccess({count, page, pageSize, list});
  });

  // 帖子详情
  $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {
    const topic = await $.method('topic.get').call({_id: req.params.topic_id});
    if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));
    const userId = req.session.user && req.session.user._id && req.session.user._id.toString();
    const isAdmin = req.session.user && req.session.user.isAdmin;

    const result = {};
    // mongodb返回的数据是不能修改的
    result.topic = $.utils.cloneObject(topic);
    result.topic.permission = {
      edit: isAdmin || userId === result.topic.author._id,
      delete: isAdmin || userId === result.topic.author._id,
    };
    result.topic.comments.forEach(item => {
      item.permission = {
        edit: isAdmin || userId === item.author._id,
        delete: isAdmin || userId === item.author._id,
      }
    });

    res.apiSuccess(result);
  });

  // 更新帖子
  $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {
    if ('tags' in req.body) {
      req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
    }

    req.body._id = req.params.topic_id;
    await $.method('topic.update').call(req.body);
    const topic = await $.method('topic.get').call({_id: req.params.topic_id});
    res.apiSuccess({topic});
  });

  // 删除帖子
  $.router.delete('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {
    const topic = await $.method('topic.delete').call({_id: req.params.topic_id});
    res.apiSuccess({topic});
  });

  // 给帖子增加评论
  $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, async function (req, res, next) {
    req.body._id = req.params.topic_id;
    req.body.author = req.session.user._id;
    const comment = await $.method('topic.comment.add').call(req.body);
    res.apiSuccess({comment});
  });

  // 删除评论
  $.router.post('/api/topic/item/:topic_id/comment/delete', $.checkLogin, async function (req, res, next) {
    req.body._id = req.params.topic_id;

    const query = {
      _id: req.params.topic_id,
      cid: req.body.cid
    };

    const comment = await $.method('topic.comment.get').call(query);

    // 只有评论的作者才可以删除评论，个人觉得topic的作者应该也可以删
    if (comment && comment.comments && comment.comments[0]) {
      const item = comment.comments[0];
      if (req.session.user.isAdmin || item.author._id.toString() === req.session.user._id.toString()) {
        await $.method('topic.comment.delete').call(query);
      } else {
        return next(new Error('access denied'));
      }
    } else {
      return next(new Error('topic not exists'));
    }

    res.apiSuccess({comment:comment.comments[0]});
  });

  done();
};
