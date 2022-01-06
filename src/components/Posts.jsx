import React from 'react'
import Post from './Post'

const posts = [
    {
        id: 1,
        username: 'Laura',
        name: 'Laura lake',
        postedAt: '12 hours ago',
        userImg: "/images/logo.png",
        content: "I am so happy today for this opportunity",
        image: "/images/login.jpg",
    },
    {
        id: 2,
        username: 'Laura',
        name: 'Laura lake',
        postedAt: '12 hours ago',
        userImg: "/images/logo.png",
        content: "I am so happy today for this opportunity",
        image: "/images/login.jpg",
    },
    {
        id: 3,
        username: 'Laura',
        name: 'Laura lake',
        postedAt: '12 hours ago',
        userImg: "/images/logo.png",
        content: "I am so happy today for this opportunity",
        image: "/images/login.jpg",
    },
    {
        id: 4,
        name: 'Laura lake',
        username: 'Laura',
        postedAt: '12 hours ago',
        userImg: "/images/logo.png",
        content: "I am so happy today for this opportunity",
        image: "/images/login.jpg",
    },
]
const Posts = () => {
    return (
        <div className='posts'>
        {
            posts.map(post => <Post key={post.id} post={post}/> )
        }
        </div>
    )
}



export default Posts
