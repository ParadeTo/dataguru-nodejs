import React from 'react';
import $ from 'jquery';
import {addTopic} from '../lib/client';
import {redirectURL} from  '../lib/utils';
import MarkdownEditor from './MarkdownEditor';

export default class TopicEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.topic) {
      this.setState(this.props.topic);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.topic) {
      this.setState(newProps.topic);
    }
  }

  handleChange(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    this.props.onSave(this.state, () => {
      $btn.button('reset');
    })
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {this.props.title}
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
              <MarkdownEditor value={this.state.content} onChange={this.handleChange.bind(this,'content')} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
          </form>
        </div>
      </div>
    );
  }
}
