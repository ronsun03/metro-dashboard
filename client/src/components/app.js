import React from 'react';
import { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div style={{ marginTop: 60 }}>
        {/* <Header /> */}
        {this.props.children}
      </div>
    );
  }
}
