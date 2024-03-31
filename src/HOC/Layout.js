import React from 'react';
import Header from './../Header/Header';
import SideBar from './../SideBar/SideBar';

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <SideBar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;