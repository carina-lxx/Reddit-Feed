import axios from 'axios';
import React, { Component } from 'react';
import Form from './Form';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribes: [
       
      ],
    }

  }

  addSubscribe(newSubscribe) {
    this.setState({
      subscribes: [...this.state.subscribes, newSubscribe],
    })
  }

  getPosts() {

  }

  render() {
    return (
      <div>
        reddit
        <Form addSubscribe={this.addSubscribe} />
        <List subscribes={this.state.subscribes} />
      </div>
    )
  }

}



export default App;


















