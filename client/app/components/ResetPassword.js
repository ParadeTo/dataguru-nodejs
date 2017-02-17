import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {login, requestResetPassword, resetPassword} from '../lib/client';
import {redirectURL} from  '../lib/utils';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false
    };
  }

  handleSendCode(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    requestResetPassword(this.state.email)
      .then(ret => {
        $btn.button('reset');
        this.setState({'sent': true});
        alert('已经发送验证码到邮箱');
      })
      .catch(err => {
        $btn.button('reset');
        console.log(err);
      });
  }

  handleChange(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  resetPassword(e) {
    const $btn = $(e.target);
    $btn.button('loading');
    resetPassword(this.state.code, this.state.email, this.state.password)
      .then(ret => {
        $btn.button('reset');
        alert('成功');
        location.href = '/login';
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
            重置密码
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label htmlFor="ipt-email">邮箱</label>
                <input onChange={this.handleChange.bind(this,'email')} type="text" className="form-control" id="ipt-email" placeholder="Enter email"/>
              </div>
              <button type="button" className="btn btn-default" onClick={this.handleSendCode.bind(this)}>发送验证码</button>
              {
                this.state.sent ?
                <div>
                  <hr />
                    <div className="form-group">
                      <label htmlFor="code">验证码</label>
                      <input onChange={this.handleChange.bind(this,'code')} type="text" className="form-control" id="code" placeholder="code"/>
                    </div>
                  <div className="form-group">
                    <label htmlFor="password">新密码</label>
                    <input onChange={this.handleChange.bind(this,'password')} type="password" className="form-control" id="password" placeholder="Password"/>
                  </div>
                  <button type="button" className="btn btn-default" onClick={this.resetPassword.bind(this)}>修改密码</button>
                </div> : null
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
