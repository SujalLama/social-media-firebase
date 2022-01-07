import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import ModalComponent from '../components/ModalComponent'
import Navbar from '../components/Navbar'
import ProfileInfo from '../components/ProfileInfo'
import { logout } from '../service/auth'
import { userFromLocalStorage } from '../utils/userFromLocalStorage'
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase-config'


const MainLayout = ({setOpenModal, children}) => {
const[user, setUser] = useState({});
const[openLogoutModal, setOpenLogoutModal] =useState(false);
const[notification, setNotification] =useState([]);

    useEffect(() => {
    if(userFromLocalStorage()) {
      setUser(userFromLocalStorage())
    }
    }, []);

        //listening tot notificaitons
    useEffect(() => {
      const q = query(collection(db, "notifications"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push(doc.data());
        });
        setNotification(notifications.filter(item => !item.viewed.includes(userFromLocalStorage().userId)))
        
      });
      return () => unsubscribe();
    }, [])

    return (
      <ModalComponent
      openModal={openLogoutModal}
      setOpenModal={setOpenLogoutModal}
      title="Logout"
      component={<ConfirmLogout />}
      >
         <div className='home'>
            <div className="top-bar">
            <Header setOpenModal={setOpenModal} user={user} setOpenLogoutModal={setOpenLogoutModal}/>
            </div>
            <div className="navbar">
            <ProfileInfo user={user} />
            <Navbar notify={notification.length} />
            </div>
            <div className="main-content">
                {children}
              </div>
            <div className="sidebar">
            </div>
        </div>
      </ModalComponent>
    )
}

function ConfirmLogout ()  {
  const logoutFunc = () => {
    logout();
  }
  return <div className='confirm-modal'>
      <h1 className='heading__secondary'>Are you sure, you want to logout?</h1>
      <button className='btn btn__primary' onClick={logoutFunc}>Confirm</button>
  </div>
}

export default MainLayout
