import React from 'react'
import ProfilePic from './ProfilePic'


const ProfileInfo = ({user}) => {
    return (
        <>
       {user && <div className='profile-info box-shadow border-radius'>
           {user.photoUrl ? <div className='profile-image'>
               <img src={user.photoUrl} alt="profile pic" />
           </div> : <ProfilePic />}
            <div className="profile-info__content">
                <h1 className='heading--secondary'>{user.name}</h1>
                <p className='paragraph'>@{user.username}</p>
            </div>
        </div>}
        </>
    )
}

export default ProfileInfo
