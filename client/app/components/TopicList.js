import React from 'react';
import { Link } from 'react-router';
import {getTopicList} from '../lib/client'

export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  componentWillMount() {
    getTopicList()
      .then(ret => {this.setState({list: ret.list})})
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
