import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/monokai-sublime.css';
import {getTopicDetail} from '../lib/client';
import {renderMarkdown} from '../lib/utils';


export default class TopicDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      topic:null
    };
  }

  componentDidMount() {
    getTopicDetail(this.props.params.id)
      .then(topic => {
        topic.html = renderMarkdown(topic.content);
        this.setState({topic: topic})
      })
      .catch(err => console.error(err));
  }

  render() {
    const topic = this.state.topic;
    if (!topic) {
      return <div>正在加载...</div>
    }
    return (
      <div>
        <h2>{topic.title}</h2>
        <Highlight className="language-javascript">
          {"if(1+1 === 2) {var a = 1;}"}
        </Highlight>
        <section dangerouslySetInnerHTML={{__html:topic.html}} />
        <ul className="list-group">
          {
            topic.comments.map((item, i) => {
              return (
                <li className="list-group-item" key={i}>
                  {item.authorId}于{item.createAt}说：<br/>{item.content}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
