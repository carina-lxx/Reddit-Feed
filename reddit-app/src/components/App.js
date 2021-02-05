import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import '../style.css';

class App extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('lists')) {
      const rawLS = localStorage.getItem('lists');
      const subscribes = JSON.parse(rawLS);
    
      // const parsedPic = JSON.parse(rawPic);
      this.state = {
        subscribes: subscribes,
        avatars: {},
      }
    } else {
      this.state = {
        subscribes: [],
        avatars: {},
      }
      localStorage.setItem('lists', JSON.stringify(this.state.subscribes))
      localStorage.setItem('avatars', JSON.stringify(this.state.avatars))
    }

    this.getSubredditPost = this.getSubredditPost.bind(this);
    this.getAvatars = this.getAvatars.bind(this);

  }

  componentDidMount() {


  }

  getSubredditPost(subredditTitle) {
    fetch(`/posts/${subredditTitle}`)
      .then(res => res.json())
      .then(
        (result) => {
          const rawLS = localStorage.getItem('lists');
          const subscribes = JSON.parse(rawLS);
          // const { subscribes } = this.state;
          if (subscribes.length === 5) {
            subscribes.splice(0, 1);
            this.setState({
              subscribes: [...subscribes, result],
            })
            localStorage.setItem('lists', JSON.stringify(this.state.subscribes));
            localStorage.setItem('avatars', JSON.stringify(this.state.avatars));
          
          } else {
            this.setState({
              subscribes: [...this.state.subscribes, result],
            });
            localStorage.setItem('lists', JSON.stringify(this.state.subscribes));
            localStorage.setItem('avatars', JSON.stringify(this.state.avatars));
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
          const { avatars } = this.state;
          avatars[subredditTitle] = result.avatar;
          this.setState({
            avatars: avatars
          })
          localStorage.setItem('avatars', this.state.avatars)

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
