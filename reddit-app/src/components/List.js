import React from 'react';
import Post from './Post';

const List = ({ subscribes, avatars }) => (


 
    <ul>
        {
            subscribes.sort(function(a, b) { return b.score - a.score}).map(post => (
                <Post key={post.name + post.time} post={post} avatar={avatars[post.name]}/>
            ))
        }
    </ul>
)
 
export default List;