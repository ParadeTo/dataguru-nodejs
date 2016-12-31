import React from 'react';
import { Link } from 'react-router';
import {
  signup,
  login,
  logout,
  addTopic,
  updateTopic,
  delTopic,
  getTopicList,
  getTopicDetail,
  addComment,
  delComment
} from '../lib/client'

export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  componentWillMount() {
    // console.log('测试注册');
    // signup({name:'youxingzhi',email:'youxingzhi@qq.com',password:'123456'})
    //   .then(console.log)
    //   .catch(err => console.log(err));

    login({name:'youxingzhi',password:'123456'})
      .then(ret => {console.log('测试登录'); console.log(ret);})
      .catch(err => console.log(err));

    addTopic({title:'今天是2016最后一天',content:'我TM还在加班！',tags:'吐槽,无聊'})
      .then(ret => {console.log('增加帖子'); console.log(ret);})
      .catch(err => console.log(err));

    updateTopic("5867198b4b4539316070c1d5",{title:'今天是2016最后一天呀呀呀',content:'我TM还在加班呀呀呀！',tags:'吐槽,无聊'})
      .then(ret => {console.log('更新帖子'); console.log(ret);})
      .catch(err => console.log(err));

    getTopicList()
      .then(ret => {this.setState({list: ret.list})})
      .catch(err => console.log(err));

    getTopicDetail("5867198b4b4539316070c1d5")
      .then(ret => {console.log('帖子详情');console.log(ret);})
      .catch(err => console.log(err));

    // delTopic('586718ce4b4539316070c1d0')
    //   .then(ret => {console.log('删除帖子'); console.log(ret);})
    //   .catch(err => console.log(err));

    addComment("5867198b4b4539316070c1d5",{content:'好可怜！！！'})
      .then(ret => {console.log('增加评论'); console.log(ret);})
      .catch(err => console.log(err));

    delComment("5867198b4b4539316070c1d5",{cid:"58671b6f4b4539316070c1e0"})
      .then(ret => {console.log('删除评论'); console.log(ret);})
      .catch(err => console.log(err));
  }

  render() {
    const list = Array.isArray(this.state.list) ? this.state.list : [];
    return (
      <ul className="list-group">
        {
          list.map((item, i) => {
            return (
              <Link to={`/topic/${item._id}`} className="list-group-item" key={i}>
                {item.title}
              </Link>
            )
          })
        }
      </ul>
    );
  }
}
