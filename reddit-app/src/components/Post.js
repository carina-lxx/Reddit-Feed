import React from 'react';

const Post = ({post, avatar}) => (
    <li>
        <div> Name: {post.name}</div>
        <div> Title: {post.title}</div>
        <div> Avatar: {avatar}</div>
        <div> Score: {post.score}</div>
        <div> Time: {post.time}</div>
        <div> Url: {post.url}</div>
    </li>
)

export default Post;