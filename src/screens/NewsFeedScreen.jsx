import { collection, getDocs, query } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import News from '../components/News'
import { db } from '../config/firebase-config'
import MainLayout from '../layout/MainLayout'
import { userFromLocalStorage } from '../utils/userFromLocalStorage'

const NewsFeedScreen = () => {
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
    useEffect(() => {
       getNotifications();
    }, []);

    async function getNotifications() {
    try {
        const data = []
      const q = query(collection(db, "notifications"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
    data.push({id: document.id, ...document.data()})
    });
     setNotifications(data.filter(item => !item.viewed.includes(userFromLocalStorage().userId)))
    setLoading(false);
    } catch (error) {
        console.log(error);
    }
}  

    return (
        <MainLayout setOpenModal={null}>
            <div className='news-feed box-shadow border-radius'>
                {
                    notifications.map(item => <News key={item.id} news={item} />)
                }
            </div>
        </MainLayout>
    )
}

export default NewsFeedScreen
