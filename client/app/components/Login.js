import React from 'react';
import $ from 'jquery';
import {login} from '../lib/client';

export default class Login extends React.Component {
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
    login({name: this.state.name, password: this.state.password})
      .then(ret => {
        $btn.button('reset');
        window.location.href = '/';
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
            登录
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label htmlFor="ipt-name">用户名</label>
                <input onChange={this.handleChange.bind(this,'name')} type="text" className="form-control" id="ipt-name" placeholder="Enter email"/>
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
