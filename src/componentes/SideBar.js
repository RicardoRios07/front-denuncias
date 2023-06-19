import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill, BsFillInfoCircleFill, BsListUl, BsPencilSquare, BsBoxArrowRight } from 'react-icons/bs';

const SideBar = ({ handleLogout, isOpen }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={`sidebar-container d-flex flex-column fixed-sidebar${isOpen ? ' open' : ''}`}>
      <div className="flex-grow-1" style={{ paddingTop: '1rem', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.1)', overflow: 'auto' }}>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <Link to="/complaint-form" className="nav-link">
              <BsFillPlusCircleFill className="me-2" />
              Crear una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-info" className="nav-link">
              <BsFillInfoCircleFill className="me-2" />
              Información de una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-list" className="nav-link">
              <BsListUl className="me-2" />
              Lista de denuncias
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/update-complaint" className="nav-link">
              <BsPencilSquare className="me-2" />
              Actualizar denuncia
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
