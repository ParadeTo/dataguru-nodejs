import React from 'react';
import { Link } from 'react-router';
import {loginUser, logout, notificationCount, unBind} from '../lib/client';

const githubIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLUlEQVRYR+2W7TEEQRCG34sAESACRIAIEAEiQASIABFwGcgAESACZCAD6lHbW72tZ3fuVtX90VVbx27PzDNvf8xMtGCbLHh9zQqwLGlD0k4Dzu+7e56av6v3VQuwJulc0r4kIPrsUdKdpGkNxRAAi11JOqqZLPigzIGkl76xfQCbkm4l8TvGTiXdlCYoAbDoQ4XctWAAAPLLMgBkf5ZE3P/Sjpvc6MyZAdxL2nNeDOQdCXghaXWAiuTDjxz4cr6fknZjTkQAko24e9sKg3zpeb/sPRWx7Zz4H4jWIkAcgGMEmCUs2Xzrvld4AGL+lswOMRPNY4QhhowQtWXtAYgbzcbb68gyzEJKLqzYIh4gk4tGQgKOMRoR7dsbAIB0zoIMoHUcQRCriqnasHoFfMlkCs3LkIW27QkeAEmWwipDZ0UN1LWkk+DYhnYoB8ZUgK2Z5UAaAo7Qw0Ba7OE1W2/aeVba7caHypCw0Iio53ksS8APf854AE5ADqFoSEjMZoXIFGXuYiPio5UiDYjk4Qi1GmZCHq5dJWMT9H7GlU7TYitmUq8CAJcNlG8kwHHw/DQSZ1m5RdDO7mMjMmcvnUmPMlaiZ406mQpZL/F+nd2XALiQsCC7Ju4MwmzXfXe87PAxgOoLCQM8BDDIi/RmUX57n7VzvqWLlxSwyTyEl7GvOWUAxcWHAEwJMprHcqAWgGpBud67RG2vRw2qgk7Zd0OyxQYXNklrAYqFP/bDP8A3Y3N5IRB+9MYAAAAASUVORK5CYII=';

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
    notificationCount(false)
      .then(notificationCount => {
        this.setState({notificationCount});
      })
      .catch(err => console.error(err));
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

  unbind() {
    unBind()
      .then(ret => {
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
                  <li><Link to="/profile">设置</Link></li>
                  <li>
                    <Link to="/notification">消息
                      {
                        this.state.notificationCount > 0 ?
                        <span className='text-danger'>
                          {`(${this.state.notificationCount})未读`}
                        </span>
                        :
                        null
                      }
                    </Link>
                  </li>
                  <li><a onClick={this.handleLogout.bind(this)}>注销[{this.state.user.nickname}]</a></li>
                  {
                    this.state.user.githubUsername ?
                    <li>
                      <a>
                        <img src={githubIcon} style={{width: '20px'}}/>
                        {this.state.user.githubUsername}
                        <a style={{marginLeft: '10px'}} className="btn-sm btn-primary" onClick={this.unbind.bind(this)}>解除绑定</a>
                      </a>
                    </li> : null
                  }
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
