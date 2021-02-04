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
            searchTerm: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        alert(`searched a subreddit`)
    }

    render() { 
        return ( 
        
                <form onSubmit={this.handleSubmit}>
                    <label> r/
                        <input 
                        type='text' 
                        name='redditName' 
                        onChange={this.handleChange}
                        value={this.state.redditName} />
                    </label>
                    <button>Subscribe</button>
                </form>
         );
    }
}
 
export default Form;