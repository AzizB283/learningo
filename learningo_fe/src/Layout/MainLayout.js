import React from 'react';
import HeaderBar from '../components/header/HeaderBar';
import Footer from '../components/Footer/footer';

function MainLayout({ children }) {
  return (
    <>
      <HeaderBar />
      <div
        style={{
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          // backgroundColor: 'rgb(255 247 236)',
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
