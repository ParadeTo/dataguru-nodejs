import React from 'react';
import $ from 'jquery';
import {getTopicDetail,updateTopic} from '../lib/client';
import {redirectURL} from  '../lib/utils';
import TopicEditor from  './TopicEditor.js';

export default class EditTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      topic:{}
    };
  }

  componentWillMount() {
    getTopicDetail(this.props.params.id)
      .then(topic => {
        this.setState({topic});
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <TopicEditor
        title={`编辑 ${this.state.topic.title}`}
        topic={this.state.topic}
        onSave={(topic, done) => {
          updateTopic(this.props.params.id,{title: topic.title, tags: topic.tags, content: topic.content})
            .then(ret => {
              done();
              redirectURL(`/topic/${ret._id}`);
            })
            .catch(err => {
              done();
            });
        }}/>
    );
  }
}
