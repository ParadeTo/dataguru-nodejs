import React from 'react';

const footerStyle = {
  marginTop: 50,
  paddingTop: 20
}

export default class Footer extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <footer className="text-center" style={footerStyle}>
          &copy;CopyRight Ayou
        </footer>
      );
  }
}
