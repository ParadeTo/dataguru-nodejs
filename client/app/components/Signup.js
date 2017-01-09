import React from 'react';
import $ from 'jquery';
import {signup} from '../lib/client';
import {redirectURL} from  '../lib/utils';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleLogin(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    signup({name:this.state.name, nickname: this.state.nickname, email:this.state.email, password:this.state.password})
      .then(ret => {
        $btn.button('reset');
        alert('注册成功')
        redirectURL('/login');
      })
      .catch(err => {
        $btn.button('reset');
        console.log(err);
      });

  }

  render() {
    return (
      <div style={{width: 400, margin: 'auto'}}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            注册
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label htmlFor="ipt-name">用户名</label>
                <input onChange={this.handleChange.bind(this,'name')} type="text" className="form-control" id="ipt-name" placeholder="Enter name"/>
              </div>
              <div className="form-group">
                <label htmlFor="ipt-email">邮箱</label>
                <input onChange={this.handleChange.bind(this,'email')} type="email" className="form-control" id="ipt-email" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label htmlFor="ipt-nickname">昵称</label>
                <input onChange={this.handleChange.bind(this,'nickname')} type="email" className="form-control" id="ipt-nickname" placeholder="Enter nicknamel"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">密码</label>
                <input onChange={this.handleChange.bind(this,'password')} type="password" className="form-control" id="password" placeholder="Password"/>
              </div>
              <button type="button" className="btn btn-default" onClick={this.handleLogin.bind(this)}>登录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
