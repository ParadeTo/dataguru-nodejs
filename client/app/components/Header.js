import React from 'react';
import { Link } from 'react-router';
import {loginUser, logout} from '../lib/client';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    loginUser()
      .then(user => {
        this.setState({user});
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogout() {
    logout()
      .then(user => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let rightNavs = null;
    if (this.state.user) {

    }
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">简单论坛系统</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/">首页</Link></li>
              <li><Link to="/new"><i className="glyphicon glyphicon-plus"></i>发帖</Link></li>
            </ul>
              {
                this.state.user ?
                <ul className="nav navbar-nav navbar-right">
                  <li><a onClick={this.handleLogout.bind(this)}>注销[{this.state.user.nickname}]</a></li>
                </ul>
                :
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to="/login">登录</Link></li>
                  <li><Link to="/signup">注册</Link></li>
                </ul>
              }
          </div>
        </div>
      </nav>
    );
  }
}
