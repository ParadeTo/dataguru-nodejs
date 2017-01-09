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

const xssOptions = {
  whiteList: Object.assign({}, xss.whiteList),
};
xssOptions.whiteList.code = ['class'];
xssOptions.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

export function renderMarkdown(text) {
  return myxss.process(marked(text));
}
