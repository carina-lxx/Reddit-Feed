import React from 'react';
import Post from './Post';

const List = ({ subscribes, avatars }) => {
    const len = subscribes.length;


    return (
        <div className='cards'>
            <div className='channel'>{len}/5 Channels</div>
            <ul className='list'>
                {
                    subscribes.sort(function (a, b) { return b.score - a.score }).map((post, index) => (
                        <
                            Post
                            key={index + post.title}
                            post={post}
                            avatar={avatars[post.name]}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default List;