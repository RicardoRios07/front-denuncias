import React, { useState, useEffect } from 'react';
import { BiTachometer, BiSearch, BiUser, BiLogOut, BiMenu } from 'react-icons/bi';
import { BsListUl } from 'react-icons/bs';
import { MDBBtn } from 'mdb-react-ui-kit';

const NavBar = ({ handleLogout, toggleSideBar }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 767 || (window.innerWidth >= 768 && window.innerWidth <= 810 && window.innerHeight <= 1080));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="badge-container d-flex justify-content-between align-items-center p-2" style={{ backgroundColor: "#325aa8" }}>
      <div className="d-flex align-items-center">
        <BiTachometer className="me-2" size="75px" color='white' />
        {!isMobileView && <span className="badge-text" color='white'>CORRUPTÓMETRO</span>}
      </div>
      <div className="d-flex align-items-center">
        <MDBBtn color="secondary" size="sm" className="me-2">
          <BiUser />
        </MDBBtn>
        <MDBBtn color="danger" size="sm" onClick={handleLogout}>
          <BiLogOut />
        </MDBBtn>
        <MDBBtn color="primary" size="sm" className="sidebar-toggle-button" onClick={toggleSideBar}>
          <BsListUl />
        </MDBBtn>
      </div>
    </div>
  );
}

export default NavBar;
