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
    this.getSubredditPost = this.getSubredditPost.bind(this);
    this.getAvatars = this.getAvatars.bind(this);

  }

  componentDidMount() {

  }

  getSubredditPost(subredditTitle) {
    fetch(`/users/1/posts/${subredditTitle}`)
        .then(res => res.json())
        .then(
          (result) => {
            const { subscribes } = this.state;
            if(subscribes.length === 5) {
              subscribes.splice(0, 1)
              this.setState({
                subscribes: [...subscribes, result],
              })
            } else {
              this.setState({
                subscribes:[...this.state.subscribes, result],
              });
            }
          },
          (error) => {
            console.log(error)
          }
        )
  }

  getAvatars(subredditTitle) {
    fetch(`/avatars/${subredditTitle}`)
      .then(res => res.json())
      .then(
        (result) => {
          let { avatars } = this.state;
          avatars[subredditTitle] = result.avatar;
          this.setState({
            avatars: avatars
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <div className='wrapper'>
        <h2 className='header'>Add to my feed:</h2>
        <Form getSubredditPost={this.getSubredditPost} getAvatars={this.getAvatars} />
        <List subscribes={this.state.subscribes} avatars={this.state.avatars} />
      </div>
    )
  }

}



export default App;
