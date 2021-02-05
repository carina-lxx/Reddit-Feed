import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import '../style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribes: [],
      avatars: {},
    }
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getAllAvatars = this.getAllAvatars.bind(this);
    this.savePosts = this.savePosts.bind(this);
    this.saveAvatars = this.saveAvatars.bind(this);
  }

  componentDidMount() {
    this.getAllAvatars();
    this.getAllPosts();
  }

  getAllPosts() {
    fetch('/users/1/posts')
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            subscribes: response
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getAllAvatars() {
    fetch('/users/1/avatars')
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            avatars: response
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  savePosts(subredditTitle) {
    fetch(`/users/1/posts/${subredditTitle}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subredditTitle }),
    })
      .then(this.getAllPosts)
      .catch(console.log);
  }

  saveAvatars(subredditTitle) {
    fetch(`/users/1/avatars/${subredditTitle}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subredditTitle }),
    })
      .then(this.getAllAvatars)
      .catch(console.log);
  }

  render() {
    return (
      <div className='wrapper'>
        <h2 className='header'>Add to my feed:</h2>
        <Form getSubredditPost={this.getSubredditPost} saveAvatars={this.saveAvatars} savePosts={this.savePosts} />
        <List subscribes={this.state.subscribes} avatars={this.state.avatars} />
      </div>
    )
  }
}

export default App;
