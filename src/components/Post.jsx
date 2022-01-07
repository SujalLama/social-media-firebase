import React, {useState, useEffect} from 'react'
import ProfilePic from './ProfilePic'
import {AiOutlineLike, AiOutlineComment, AiOutlineLink} from 'react-icons/ai'
import ReactPlayer from 'react-player';
import { likePost } from '../service/post';
import { db } from '../config/firebase-config';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { createNotification } from '../service/notification';

const Post = ({post, user}) => {
    const [isComment, setIsComment] = useState(false);
    
    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        if(post.like.includes(user.userId)) {
            setIsLike(true);
        }
    }, []);

    async function likeFunc() {
        setIsLike(!isLike);
        await likePost(post.id, user.userId, !isLike);
    }

    return (
        <div className='post box-shadow border-radius'>
            <div className="post__owner">
                {post.creator.photoUrl ? <div className='profile-image'>
               <img src={post.creator.photoUrl} alt="profile pic" />
           </div> : <ProfilePic />}
                <div className="profile-info__content">
                    <h1 className='heading--secondary'>{post.creator.name}</h1>
                    <p className='paragraph'>@{post.creator.username}</p>
                </div>
            </div>
            <div className="post__content">
                <p className='paragraph'>{post.text}</p>
               {post.photoUrl && <div className="post__content--multimedia">
                    <div className="img-wrapper">
                        <img src={post.photoUrl} alt={post.content} />
                    </div>
                </div>}
                {post.videoUrl && <div className="post__content--multimedia">
                    <div className="img-wrapper">
                    <ReactPlayer url={post.videoUrl} controls={true} /> 
                    </div>
                    </div>}
            </div>
            <div className="post__footer">
                <button className={`btn btn__text ${(isLike) && 'active'}`} onClick={likeFunc}>
                    <AiOutlineLike />
                    <span>Like</span>
                </button>
                <button className={`btn btn__text ${isComment && 'active'}`} onClick={() => setIsComment(!isComment)}>
                    <AiOutlineComment />
                    <span>Comment</span>
                </button>
            </div>
          {isComment && <Comment user={user} post={post} />}
        </div>
    )
}

function Comment({user, post}) {
    const[comment, setComment] = useState('');
    const[comments, setComments] = useState();

    
    useEffect(() => {
        getComments();
    }, []);

     const getComments = async () => {
        const commentsDatabase = [];
        const q = query(collection(db, "comments"), where("postId", "==", post.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        commentsDatabase.push({...doc.data()})
        })
        setComments(commentsDatabase);
    }
    
    async function addCommentFunc() {
        try {
            const commentformData = {
                                        text: comment,
                                        postId: post.id,
                                        creator: {
                                        id: user.userId,
                                        username: user.username
                                        },
                                        postedAt: new Date(),
                            }
            addDoc(
                collection(db, "comments"), commentformData).then(docRef => {
                            createNotification(`commented in the post: ${post.id}`);
                            setComments([...comments, commentformData]);
                            setComment('');
                });
        } catch (error) {
            console.log(error)
        }
    }

    console.log(comments)
    return <div className="comment">
                {
                comments && comments.map(item => <div className='news'>
                    <p className='paragraph'>@{item.creator.username}</p>
                    <div className="news__message"><p className='message'>{item.text}</p></div>
                </div>)
                }
                <div className='content-add box-shadow border-radius'>
                    <ProfilePic />
                    <input className='input--default' placeholder="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button className='btn btn__primary' onClick={addCommentFunc}>
                        <AiOutlineLink />
                        <span>Comment</span>
                    </button>
                </div>
            </div>
}

export default Post
