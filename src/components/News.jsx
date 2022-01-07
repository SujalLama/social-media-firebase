import React from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { viewNotification } from '../service/notification'
import { userFromLocalStorage } from '../utils/userFromLocalStorage'

const News = ({news}) => {
    return (
        <div className='news'>
            <div className="close-icon" onClick={() => viewNotification(news.id, userFromLocalStorage().userId)}>
                <IoCloseCircleSharp />
              </div>
            <p className='paragraph'>@{news.creator.username}</p>
            <div className="news__message"><p className='message'>{news.message}</p></div>
        </div>
    )
}

export default News
