import marked from 'marked';
import Highlight from 'highlight.js';
import xss from 'xss';
import {browserHistory} from 'react-router';

export function redirectURL(url) {
  browserHistory.push(url);
  // location = url;
}

marked.setOptions({
  highlight: function (code) {
    return Highlight.highlightAuto(code).value;
  }
});
export function renderMarkdown(text) {
  return xss(marked(text));
}
