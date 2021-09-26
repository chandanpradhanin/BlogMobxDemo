import React, { Component } from 'react';
import { View, Text } from 'react-native';

import TodoStore from './TodoStore';
import Home from './Home';
import { Provider } from 'mobx-react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider todoStore={TodoStore}>
        <Home />
      </Provider>
    );
  }
}
