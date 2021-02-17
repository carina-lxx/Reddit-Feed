import axios from 'axios';
import React, { useState, useEffect } from 'react';
import List from './List';

const Form = () => {
    const [redditName, setRedditName] = useState('');
    const [subscribes, setSubscribes] = useState([]);
    const [avatars, setAvatars] = useState({});

    const getAllPosts = async () => {
        const { data } = await axios.get('users/1/posts');
        setSubscribes(data);
    };
    const getAllAvatars = async () => {
        const { data } = await axios.get('/users/1/avatars');
        setAvatars(data);
    }

    const savePosts = async () => {
        fetch(`/users/1/posts/${redditName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ redditName }),
        })
            .then(getAllPosts)
            .catch(console.log);
    }
    const saveAvatars = async () => {
        fetch(`/users/1/avatars/${redditName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ redditName }),
        })
            .then(getAllAvatars)
            .catch(console.log);
    }

    useEffect(() => {
        getAllPosts();
    }, []);
    useEffect(() => {
        getAllAvatars();

    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        savePosts();
        saveAvatars();
    }

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='label'> r/ </div>
                <div className='inputbox'>
                    <input
                        className='box'
                        type='text'
                        name='redditName'
                        placeholder='  AskReddit'
                        onChange={e => setRedditName(e.target.value)}
                        value={redditName} />
                    <button className='button'>SUBSCRIBE</button>
                </div>
            </form>
            <List subscribes={subscribes} avatars={avatars} />
        </div>
    );
}

export default Form;