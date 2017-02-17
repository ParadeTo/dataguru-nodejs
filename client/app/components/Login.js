import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {login} from '../lib/client';
import {redirectURL} from  '../lib/utils';

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
        location.href = '/';
      })
      .catch(err => {
        $btn.button('reset');
        console.log(err);
      });

  }

  render() {
    const isBind = (this.props.location.query.bind === '1');
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
              <button type="button" className="btn btn-default" onClick={this.handleLogin.bind(this)}>{isBind ? '绑定' : '登录'}</button>
              {
                isBind ? null :
                <a href="/auth/github" className="btn btn-info">使用github账号登录</a>
              }
              <span className='pull-right'>
                <Link to="/reset_password">忘记密码</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
