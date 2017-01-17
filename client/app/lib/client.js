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
