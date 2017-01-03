import React from 'react';
import $ from 'jquery';
import {addTopic} from '../lib/client';
import {redirectURL} from  '../lib/utils';

export default class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    addTopic({title: this.state.title, tages: this.state.tags, content: this.state.content})
      .then(ret => {
        $btn.button('reset');
        console.log('成功');
        redirectURL(`/topic/${ret._id}`);
      })
      .catch(err => {
        $btn.button('reset');
      })
    // login({name: this.state.name, password: this.state.password})
    //   .then(ret => {
    //     $btn.button('reset');
    //     window.location.href = '/';
    //   })
    //   .catch(err => {
    //     $btn.button('reset');
    //     console.log(err);
    //   });

  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          发帖
        </div>
        <div className="panel-body">
          <form role="form">
            <div className="form-group">
              <label htmlFor="ipt-title">标题</label>
              <input onChange={this.handleChange.bind(this,'title')} type="text" className="form-control" id="ipt-title" />
            </div>
            <div className="form-group">
              <label htmlFor="ipt-tags">标签</label>
              <input onChange={this.handleChange.bind(this,'tags')} type="text" className="form-control" id="ipt-tags" />
              <p className="help-block">多个标签用逗号分隔</p>
            </div>
            <div className="form-group">
              <label htmlFor="ipt-content">内容</label>
              <textarea rows={10} onChange={this.handleChange.bind(this,'content')} className="form-control" id="ipt-content" ></textarea>
            </div>
            <button type="button" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>确认</button>
          </form>
        </div>
      </div>
    );
  }
}
