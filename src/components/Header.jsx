import React, { useState} from 'react'
import { withRouter } from 'react-router-dom';

//icons
import {IoIosAddCircleOutline} from 'react-icons/io';
import ProfilePic from './ProfilePic';


const Header = ({location, setOpenModal, user, setOpenLogoutModal}) => {
    return (
        <div className='header-wrapper box-shadow'>
            <div className="header container">
                <div className="header__left">
                    <div className="logo">
                        <img src="/images/logo.png" alt="logo of the website" />
                    </div>

                    <h1 className='heading--main'>Social Media</h1>
                </div>
                <div className="header__right">
                    {/* <div className="search-container">
                        <AiOutlineSearch />
                    <input type="text" className="input__default" placeholder="Search"/>
                    </div> */}

                    <button className="btn btn__primary btn__create" onClick={() => setOpenModal(true)} disabled={location.pathname.split('/')[1]}>
                        <IoIosAddCircleOutline />
                        <span>Create</span>
                    </button>
                    <div onClick={() => setOpenLogoutModal(true)}>
                    {user.photoUrl ? <div className='profile-image' >
                            <img src={user.photoUrl} alt="profile pic" />
                        </div> : <ProfilePic />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
