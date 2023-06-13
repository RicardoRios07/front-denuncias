import React from 'react';
import { Link } from 'react-router-dom';
import { BiPlusCircle, BiInfoCircle, BiListUl, BiEdit } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';


const Menu = ({ handleLogout }) => {
  return (
    <div className="menu-container d-flex flex-column" style={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: '1px solid #dee2e6', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div className="container">
          <form className="d-flex mx-2">
            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-outline-primary" type="submit">Buscar</button>
          </form>
        </div>
      </nav>
      <div className="flex-grow-1 overflow-auto" style={{ paddingTop: '1rem' }}>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <Link to="/complaint-form" className="nav-link">
              <BiPlusCircle className="me-2" />
              Crear una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-info" className="nav-link">
              <BiInfoCircle className="me-2" />
              Información de una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-list" className="nav-link">
              <BiListUl className="me-2" />
              Lista de denuncias
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/update-complaint" className="nav-link">
              <BiEdit className="me-2" />
              Actualizar denuncia
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-3 d-flex justify-content-center" style={{ borderTop: '1px solid #dee2e6' }}>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          <FiLogOut className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Menu;
