import React from 'react'
import ProfilePic from './ProfilePic'


const ProfileInfo = () => {
    return (
        <div className='profile-info box-shadow border-radius'>
           <ProfilePic />
            <div className="profile-info__content">
                <h1 className='heading--main'>Sujal lama</h1>
                <p className='paragraph'>@lamasujal</p>
            </div>
        </div>
    )
}

export default ProfileInfo
