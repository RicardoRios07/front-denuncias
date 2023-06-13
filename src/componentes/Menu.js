import React from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Menu = ({ handleLogout }) => {
  return (
    <div className="menu-container d-flex flex-column" style={{ height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: '1px solid #dee2e6', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div className="container">
          <form className="d-flex mx-2">
            <MDBInput className="form-control me-2" type="search" label="Buscar" />
            <MDBBtn color="primary" size="sm">
              Buscar
            </MDBBtn>
          </form>
        </div>
      </nav>
      <div className="flex-grow-1 overflow-auto" style={{ paddingTop: '1rem' }}>
        <ul className="navbar-nav flex-column">
          <li className="nav-item">
            <Link to="/complaint-form" className="nav-link">
              <MDBIcon icon="plus-circle" className="me-2" />
              Crear una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-info" className="nav-link">
              <MDBIcon icon="info-circle" className="me-2" />
              Información de una denuncia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/complaint-list" className="nav-link">
              <MDBIcon icon="list-ul" className="me-2" />
              Lista de denuncias
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/update-complaint" className="nav-link">
              <MDBIcon icon="edit" className="me-2" />
              Actualizar denuncia
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-3 d-flex justify-content-center" style={{ borderTop: '1px solid #dee2e6' }}>
        <MDBBtn color="danger" onClick={handleLogout}>
          <MDBIcon icon="sign-out-alt" className="me-2" />
          Cerrar Sesión
        </MDBBtn>
      </div>
    </div>
  );
}

export default Menu;
