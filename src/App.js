import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ComplaintForm from './componentes/complaints/ComplaintForm';
import ComplaintInfo from './componentes/complaints/ComplaintInfo';
import ComplaintList from './componentes/complaints/ComplaintList';
import UpdateComplaint from './componentes/complaints/UpdateComplaint';
import LoginForm from './componentes/LoginForm';
import SideBar from './componentes/SideBar';
import AppTitle from './componentes/AppTitle';
import NavBar from './componentes/NavBar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedTime = localStorage.getItem('loginTime');

    if (storedUsername && storedPassword && storedTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - Number(storedTime);
      const expiresIn = 60 * 60 * 1000;

      if (elapsedTime < expiresIn) {
        setLoggedIn(true);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('loginTime');
      }
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const currentTime = new Date().getTime();

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('loginTime', currentTime);

      setLoggedIn(true);
      setShowLoginForm(false);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('loginTime');

    setLoggedIn(false);
    setShowLoginForm(false);
  };

  const handleLogoutAndRedirect = () => {
    handleLogout();
    window.location.href = '/login';
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        {loggedIn && (
          <div className="navbar-container">
            <NavBar handleLogout={handleLogoutAndRedirect} toggleSideBar={toggleSideBar} />
          </div>
        )}
        <div className="d-flex flex-grow-1">
          {loggedIn && (
            <div className="sidebar-container">
              <SideBar handleLogout={handleLogoutAndRedirect} isOpen={isSideBarOpen} />
            </div>
          )}
          <div className="content-container flex-grow-1 p-7">
            <div className="container">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                  path="/login"
                  element={loggedIn ? <Navigate to="/complaint-form" /> : <LoginForm onLogin={handleLogin} />}
                />
                {loggedIn && (
                  <>
                    <Route path="/complaint-form" element={<ComplaintForm />} />
                    <Route path="/complaint-info" element={<ComplaintInfo />} />
                    <Route path="/complaint-list" element={<ComplaintList />} />
                    <Route path="/update-complaint" element={<UpdateComplaint />} />
                  </>
                )}
           </Routes>
          </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;