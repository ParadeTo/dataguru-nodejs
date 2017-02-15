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
    this.updateList({
      page: this.props.location.query.page,
      tags: this.props.location.query.tags
    })
  }

  componentWillReceiveProps(newProps) {
    this.updateList({
      tags: newProps.location.query.tags,
      page: newProps.location.query.page,
    });
  }

  updateList(query) {
    getTopicList(query)
      .then(ret => {this.setState(ret)})
      .catch(err => console.log(err));
  }

  render() {
    const list = Array.isArray(this.state.list) ? this.state.list : [];
    let page = this.state.page;
    if (!(page > 1)) page = 1;

    let prevPage = page - 1;
    if (prevPage < 1) prevPage = 1;

    let nextPage = page + 1;

    return (
      <div>
        <ul className="list-group">
          {
            list.map((item, i) => {
              return (
                <Link to={`/topic/${item._id}`} className="list-group-item" key={i}>
                  {item.title}
                  <span className="pull-right">
                    {item.author.nickname} 发表于 {item.createdAt}
                    ，阅读量：{item.pageView || 0}
                  </span>
                </Link>
              )
            })
          }
        </ul>
        <nav>
          <ul className="pagination">
            <li><Link to={`/?page=${prevPage}`}>&laquo;</Link></li>
            <li><Link to={`/?page=${nextPage}`}>&raquo;</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
