var jQuery = require('jquery');
window.jQuery = jQuery;
require('bootstrap-webpack');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//import './main.less';
ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('div'))
);
