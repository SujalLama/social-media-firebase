import React from 'react'
import ProfilePic from './ProfilePic'
import {AiOutlineLink} from 'react-icons/ai'

const ContentAdd = ({setOpenModal, btn, placeholder, user}) => {
    return (
        <div className='content-add box-shadow border-radius'>
            {user.photoUrl ? <div className='profile-image'>
               <img src={user.photoUrl} alt="profile pic" />
           </div> : <ProfilePic />}
            <input className='input--default' placeholder={placeholder} onClick={() => setOpenModal(true)}/>
            <button className='btn btn__primary' onClick={() => setOpenModal(true)}>
                <AiOutlineLink />
                <span>{btn}</span>
            </button>
        </div>
    )
}

export default ContentAdd
