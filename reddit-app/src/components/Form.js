import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redditName: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
            redditName: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.getSubredditPost(this.state.redditName);
        this.props.getAvatars(this.state.redditName)
    }

    render() {
        return (

            <form className='form' onSubmit={this.handleSubmit}>
                <div className='label'> r/ </div>
                <div className='inputbox'>
                    <input 
                        className='box'                
                        type='text'
                        name='redditName'
                        onChange={this.handleChange}
                        value={this.state.redditName} />
          
                    <button className='button'>Subscribe</button>
                </div>
            </form>
        );
    }
}

export default Form;