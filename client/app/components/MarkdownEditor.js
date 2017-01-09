import React from 'react';
import Codemirror from 'react-codemirror';
import '../lib/style.css';
import '../../node_modules/codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
import '../../node_modules/codemirror/mode/gfm/gfm';

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Codemirror
        onChange={(value) => {
          this.props.onChange({target: {value: value}})
        }}
        value={this.props.value}
        options={{
          mode: 'gfm',
          viewportMargin: Infinity
          // lineNumbers: false,
          // theme: 'default'
        }} />
    );
  }
}
