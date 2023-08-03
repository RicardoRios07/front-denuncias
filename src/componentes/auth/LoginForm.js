import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { FaSpinner } from 'react-icons/fa';
import { BiUserCircle, BiLockAlt, BiCheckCircle } from 'react-icons/bi';
import Footer from '../Footer/Footer';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onLogin(username, password);
    setSubmitting(false);
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-100 d-flex align-items-center justify-content-center">
      <MDBRow className="h-100">
        <MDBCol md='6' className="d-flex align-items-center justify-content-center">
          <img src="https://img.freepik.com/vector-premium/corrupcion-mano-pone-dinero-escala-soborno-aislado-blanco-ilustracion-plana-practicas-corruptas-sistema-legal-jurisprudencia_169479-186.jpg" className="img-fluid" alt="Corrupciion" />
        </MDBCol>

        <MDBCol md='6' className="d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="w-75">
            <MDBInput
              wrapperClass='mb-4'
              label='Nombre de usuario'
              id='username'
              type='text'
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<BiUserCircle />}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Contraseña'
              id='password'
              type='password'
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<BiLockAlt />}
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Recordarme' icon={<BiCheckCircle />} />
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className={`mb-0 px-5 ${submitting ? 'disabled' : ''}`} size='lg' type='submit' disabled={submitting}>
                {submitting ? (
                  <>
                    <FaSpinner className="me-2" />
                    Cargando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>

      <Footer />
    </MDBContainer>
  );
};

export default LoginForm;
