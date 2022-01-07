import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {FaRegUserCircle} from 'react-icons/fa'
import {BiNews} from 'react-icons/bi'
import {withRouter} from 'react-router-dom';

const Navbar = ({history, location, notify}) => {
    return (
        <div className='nav box-shadow border-radius'>
            <ul>
                <li className={`${location.pathname.split('/')[1] === '' && 'active'}`} onClick={() => history.push('/')}>
                    <div className="icon-group">
                        <AiOutlineHome /><span className='heading--secondary'>Home</span>
                    </div>
                </li>
                <li className={`${location.pathname.split('/')[1] === 'profile' && 'active'}`} onClick={() => history.push('/profile')}>
                    <div className="icon-group">
                        <FaRegUserCircle /><span className='heading--secondary'>Profile</span>
                    </div>
                </li>
                <li className={`${location.pathname.split('/')[1] === 'news' && 'active'}`} onClick={() => history.push('/news')}>
                    <div className="icon-group">
                        <BiNews /><span className='heading--secondary'>News Feed</span>
                    </div>
                    {notify > 0 && <div className="notification">{notify}</div>}
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Navbar)
