import React, { useEffect, useState } from 'react';

function ComplaintInfo() {
  const [complaintId, setComplaintId] = useState('');
  const [complaintData, setComplaintData] = useState(null);
  const [multimediaData, setMultimediaData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    if (showInfo && complaintId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://169.62.234.124:3009/api/corruptometro/complaints/${complaintId}`);
          const data = await response.json();

          if (response.ok) {
            setComplaintData(data.complaint);
            setMultimediaData(data.complaint.multimedias);
          } else {
            console.error('Error al obtener los datos de la denuncia');
            alert('Error al obtener los datos de la denuncia');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      fetchData();
    }
  }, [complaintId, showInfo]);

  const handleIdChange = (event) => {
    setComplaintId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowInfo(true);
  };

  const handleToggleImages = () => {
    setShowImages(!showImages);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="complaintId" className="form-label">ID de la denuncia:</label>
          <div className="input-group">
            <input
              type="text"
              id="complaintId"
              value={complaintId}
              onChange={handleIdChange}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">Enviar ID a consultar</button>
          </div>
        </div>
      </form>

      {showInfo && complaintData && (
        <div className="card mb-3 bg-white">
          <div className="card-header bg-primary text-white">
            <h2 className="card-title">Detalles de la denuncia</h2>
          </div>
          <div className="card-body">
            <p className="card-text text-dark">Detalle de lugar: {complaintData.detail}</p>
            <p className="card-text text-dark">Descripción: {complaintData.description}</p>
            <p className="card-text text-dark">Nombre de la persona denunciada: {complaintData.denouncedName}</p>
            <p className="card-text text-dark">Profesión de la persona denunciada: {complaintData.denouncedProfession}</p>
            <p className="card-text text-dark">Correo electrónico: {complaintData.email}</p>
            <p className="card-text text-dark">Nivel de corrupción: {complaintData.levelCorruption}</p>
            <p className="card-text text-dark">Fecha: {complaintData.date}</p>
            <b className="card-text text-dark">¿Es real?: {complaintData.isReal ? 'Sí' : 'No'}</b><p></p>
            <p className="card-text text-dark">Provincia: {complaintData.province.name}</p>
            <p className="card-text text-dark">Ciudad: {complaintData.city.name}</p>
            <p className="card-text text-dark">Institución: {complaintData.institution.name}</p>
            <p className="card-text text-dark">Tipo de corrupción: {complaintData.typeCorruption.name}</p>
            <p className="card-text text-dark">Fecha de creación: {complaintData.createdAt}</p>
            <p className="card-text text-dark">Fecha de actualización: {complaintData.updatedAt}</p>
            {multimediaData.length > 0 && (
              <button className="btn btn-primary" onClick={handleToggleImages}>
                {showImages ? 'Ocultar imágenes' : 'Mostrar imágenes'}
              </button>
            )}
          </div>
        </div>
      )}

      {showInfo && showImages && multimediaData.length > 0 && (
        <div className="card mb-3 bg-white">
          <div className="card-header bg-primary text-white">
            <h2 className="card-title">Multimedia relacionado</h2>
          </div>
          <div className="card-body">
            <div className="row">
              {multimediaData.map((media) => (
                <div className="col-sm-6 col-md-4" key={media._id}>
                  <img src={media.url} alt="Multimedia" className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showInfo && !showImages && multimediaData.length === 0 && (
        <div className="card mb-3 bg-white">
          <div className="card-body">
            <p>No hay imágenes disponibles</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintInfo;
