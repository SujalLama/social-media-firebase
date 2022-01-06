import React from 'react';
import ContentAdd from '../components/ContentAdd';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProfileInfo from '../components/ProfileInfo';


const HomeScreen = () => {
    return (
    <div className='home'>
      <div className="top-bar">
      <Header />
      </div>
      <div className="navbar">
      <ProfileInfo />
      <Navbar />
      </div>
      <div className="main-content">
        <ContentAdd />
      </div>
      <div className="sidebar">
      </div>
    </div>
    );
}

export default HomeScreen;
