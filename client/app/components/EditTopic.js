import React from 'react';
import $ from 'jquery';
import {getTopicDetail,updateTopic} from '../lib/client';
import {redirectURL} from  '../lib/utils';

export default class EditTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  componentWillMount() {
    getTopicDetail(this.props.params.id)
      .then(topic => {
        this.setState({...topic});
      })
      .catch(err => console.error(err));
  }

  handleChange(name, e) {
    let newState = {topic:null};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    updateTopic(this.props.params.id,{title: this.state.title, tags: this.state.tags, content: this.state.content})
      .then(ret => {
        $btn.button('reset');
        console.log('成功');
        redirectURL(`/topic/${ret._id}`);
      })
      .catch(err => {
        $btn.button('reset');
      });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          编辑
        </div>
        <div className="panel-body">
          <form role="form">
            <div className="form-group">
              <label htmlFor="ipt-title">标题</label>
              <input value={this.state.title} onChange={this.handleChange.bind(this,'title')} type="text" className="form-control" id="ipt-title" />
            </div>
            <div className="form-group">
              <label htmlFor="ipt-tags">标签</label>
              <input value={this.state.tags} onChange={this.handleChange.bind(this,'tags')} type="text" className="form-control" id="ipt-tags" />
              <p className="help-block">多个标签用逗号分隔</p>
            </div>
            <div className="form-group">
              <label htmlFor="ipt-content">内容</label>
              <textarea rows={10} onChange={this.handleChange.bind(this,'content')} className="form-control" id="ipt-content" value={this.state.content}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
          </form>
        </div>
      </div>
    );
  }
}
