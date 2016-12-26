import React from 'react';

import Header from './Header';
import Footer from './Footer';
import TopicList from './TopicList';
import TopicDetail from './TopicDetail';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      // getTopicList({}).then(console.log);
    }

    render() {
        return (
           <div>
             <Header />
             <TopicDetail />
             <Footer />
           </div>
        );
    }
}
