import React from 'react';
import Post from './Post';

const List = ({ subscribes }) => (
    <ul>
        {
            subscribes.map(post => (
                <Post key={post.id} post={post} />
            ))
        }
    </ul>
)
 
export default List;