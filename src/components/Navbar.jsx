import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {FaRegUserCircle} from 'react-icons/fa'
import {BiNews} from 'react-icons/bi'
const Navbar = () => {
    return (
        <div className='nav box-shadow border-radius'>
            <ul>
                <li className='active'>
                    <div className="icon-group">
                        <AiOutlineHome /><span className='heading--secondary'>Home</span>
                    </div>
                </li>
                <li>
                    <div className="icon-group">
                        <FaRegUserCircle /><span className='heading--secondary'>Profile</span>
                    </div>
                </li>
                <li>
                    <div className="icon-group">
                        <BiNews /><span className='heading--secondary'>News Feed</span>
                    </div>
                    <div className="notification">1</div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
