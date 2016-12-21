import React from 'react';
var jQuery = require('jquery');
window.jQuery = jQuery;
require('bootstrap-webpack');


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div>
             <h2>Hello world</h2>
             <button className="btn btn-primary"><i className="glyphicon glyphicon-flash"></i>我是bootstrap按钮</button>
           </div>
        );
    }
}
