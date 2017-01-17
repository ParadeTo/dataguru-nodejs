import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    Link
} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import TopicList from './TopicList';
import TopicDetail from './TopicDetail';
import Login from './Login';
import Signup from './Signup';
import NewTopic from './NewTopic';
import EditTopic from './EditTopic';

class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
          {this.props.children ? this.props.children : <TopicList {...this.props}/>}
        <Footer />
      </div>
    )
  }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={browserHistory}>
              <Route path="/" component={Index}>
                <Route path="/topic/:id" component={TopicDetail} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/new" component={NewTopic} />
                <Route path="/edit/:id" component={EditTopic} />
              </Route>
            </Router>
        );
    }
}
