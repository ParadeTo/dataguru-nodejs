import React from 'react';
import $ from 'jquery';
import {addTopic} from '../lib/client';
import {redirectURL} from  '../lib/utils';
import MarkdownEditor from './MarkdownEditor';

export default class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.comment || {};
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
              <MarkdownEditor value={this.state.content} onChange={this.handleChange.bind(this,'content')} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>发表</button>
          </form>
        </div>
      </div>
    );
  }
}
