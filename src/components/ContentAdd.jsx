import React from 'react'
import ProfilePic from './ProfilePic'
import {AiOutlineLink} from 'react-icons/ai'

const ContentAdd = () => {
    return (
        <div className='content-add box-shadow border-radius'>
            <ProfilePic />
            <input className='input--default' placeholder="What's new, Sujal?" />
            <button className='btn btn__primary'>
                <AiOutlineLink />
                <span>Post It</span>
            </button>
        </div>
    )
}

export default ContentAdd
