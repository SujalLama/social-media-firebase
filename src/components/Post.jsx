import React, {useState} from 'react'
import ProfilePic from './ProfilePic'
import {AiOutlineLike, AiOutlineComment} from 'react-icons/ai'
import ContentAdd from './ContentAdd'

const Post = ({post}) => {
    const [isComment, setIsComment] = useState(false);
    return (
        <div className='post box-shadow border-radius'>
            <div className="post__owner">
                <ProfilePic />
                <div className="profile-info__content">
                    <h1 className='heading--secondary'>{post.name}</h1>
                    <p className='paragraph'>@{post.username}</p>
                </div>
            </div>
            <div className="post__content">
                <p className='paragraph'>{post.content}</p>
                <div className="post__content--multimedia">
                    <div className="img-wrapper">
                        <img src={post.image} alt={post.content} />
                    </div>
                </div>
            </div>
            <div className="post__footer">
                <button className="btn btn__text">
                    <AiOutlineLike />
                    <span>Like</span>
                </button>
                <button className={`btn btn__text ${isComment && 'active'}`} onClick={() => setIsComment(!isComment)}>
                    <AiOutlineComment />
                    <span>Comment</span>
                </button>
            </div>
          {isComment &&  <div className="comment">
                <ContentAdd btn="comment" placeholder="comment" />
            </div>}
        </div>
    )
}

export default Post
