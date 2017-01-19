import React from 'react';
import $ from 'jquery';
import {loginUser, updateProfile} from '../lib/client';
import {redirectURL} from  '../lib/utils';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    loginUser()
      .then(user => {
        this.setState(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  submit(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    updateProfile({email:this.state.email, nickname:this.state.nickname, about:this.state.about})
      .then(ret => {
        $btn.button('reset')
      })
      .catch(err => {
        $btn.button('reset')
        console.log(err);
      });
  }

  render() {
    if (!this.state._id) {
      return (
        <p>正在加载...</p>
      )
    }
    return (
      <div style={{width: 400, margin: 'auto'}}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            {this.state.name} 的个人设置
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label htmlFor="ipt-email">邮箱</label>
                <input value={this.state.email} onChange={this.handleChange.bind(this,'email')} type="text" className="form-control" id="ipt-email" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="ipt-nickname">昵称</label>
                <input value={this.state.nickname} onChange={this.handleChange.bind(this,'nickname')} type="text" className="form-control" id="ipt-nickname" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="ipt-about">个人介绍</label>
                <textarea defaultValue={this.state.about} onChange={this.handleChange.bind(this,'about')} type="text" className="form-control" id="ipt-about" ></textarea>
              </div>
              <button type="button" className="btn btn-default" onClick={this.submit.bind(this)}>保存</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
