import React from 'react';
import Header from '../components/Header/Header';
import BottomNavBar from '../components/BottomBar/BottomBar';
import Footer from '../components/Footer/Footer';

const UserLayouts = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <BottomNavBar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayouts;
