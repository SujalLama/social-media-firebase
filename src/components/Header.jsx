import React, { useState} from 'react'
import { withRouter } from 'react-router-dom';

//icons
import {AiOutlineSearch} from 'react-icons/ai';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {FaUser} from 'react-icons/fa';
import ProfilePic from './ProfilePic';


const Header = ({history}) => {
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
                    <div className="search-container">
                        <AiOutlineSearch />
                    <input type="text" className="input__default" placeholder="Search"/>
                    </div>
                    <div className="btn btn__primary btn__create">
                        <IoIosAddCircleOutline />
                        <span>Create</span>
                    </div>
                    <ProfilePic />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
