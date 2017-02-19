import browserRequest from 'browser-request';

const urlBase = '/api';

export function request(method, path, data = {}) {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase();
    const options = {
      method,
      url: `${urlBase}/${path}`
    };
    if (method === 'GET' || method === 'HEAD') {
      options.qs = data;
    } else {
      options.form = data;
    }
    browserRequest(options, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        let data;

        try {
          data = JSON.parse(body.toString());
        } catch(err) {
          return reject(new Error('parse JSON data error:' + err.message));
        }

        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      }
    });
  });
};

// 注册
export function signup(user) {
  return request('post', 'signup', user)
    .then( ret => ret.user );
};

// 登录
export function login(user) {
  return request('post', 'login', user)
    .then(ret => ret.token);
};

// 登出
export function logout(logout_token) {
  return request('post', `logout?token=${logout_token}`);
};

// 检查登录状态
export function loginUser() {
  return request('post', 'login_user')
    .then(ret => ret.user);
}

// 解绑github账号
export function unBind() {
  return request('post', 'user/unbind');
}

// 更新用户信息
export function updateProfile(data) {
  return request('post', 'user/profile', data);
}

// 帖子列表
export function getTopicList(options) {
  return request('get', 'topic/list', options);
};

// 帖子详情
export function getTopicDetail(id) {
  return request('get', `topic/item/${id}`)
    .then(ret => ret.topic);
};

// 增加帖子
export function addTopic(topic) {
  return request('post','topic/add', topic)
    .then(ret => ret.topic);
};

// 删除帖子
export function delTopic(id) {
  return request('delete', `topic/item/${id}`)
    .then(ret => ret.topic);
};

// 更新帖子
export function updateTopic(id,topic) {
  return request('post', `topic/item/${id}`, topic)
    .then(ret => ret.topic);
};

// 增加评论
export function addComment(topicId, comment) {
  return request('post', `topic/item/${topicId}/comment/add`, comment)
    .then(ret => ret.comment);
};

// 删除评论
export function delComment(topicId, cid) {
  return request('post', `topic/item/${topicId}/comment/delete`, {cid: cid})
    .then(ret => ret);
};

// 得到消息的个数
export function notificationCount(isRead) {
  return request('get', 'notification/count', {isRead})
    .then(ret => ret.count);
};

// 得到消息列表
export function notificationList() {
  return request('get', 'notification/list');
}

// 消息设为已读
export function notificationSetRead(id) {
  return request('post', `notification/${id}/read`);
}

// 发送验证码
export function requestResetPassword(email) {
  return request('post', `user/request_reset_password`, {email});
}

// 重置密码
export function resetPassword(code, email, password) {
  return request('post', `user/reset_password`, {code, email, password});
}
