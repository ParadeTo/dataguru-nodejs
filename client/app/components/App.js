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

class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children ? this.props.children : <TopicList/>}
        <Footer />
      </div>
    )
  }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      // getTopicList({}).then(console.log);
    }

    render() {
        return (
            <Router history={browserHistory}>
              <Route path="/" component={Index}>
                <Route path="/topic/:id" component={TopicDetail} />
              </Route>
            </Router>
        );
    }
}
