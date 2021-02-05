import React from 'react';
import Post from './Post';

const List = ({ subscribes, avatars }) => (

    <ul className='list'>
        {
            subscribes.sort(function (a, b) { return b.score - a.score }).map((post, index) => (
                <
                    Post 
                    key={index+post.title}
                    post={post}
                    avatar={avatars[post.name]}
                />
            ))
        }
    </ul>
)

export default List;