import React from 'react'
import Post from './Post'

const Posts = ({posts, user}) => {
    return (
        <div className='posts'>
        {
            posts && posts.map(post => <Post key={post.id} post={post} user={user}/> )
        }
        </div>
    )
}

export default Posts;