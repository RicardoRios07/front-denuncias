import React, { useState} from 'react';

function UpdateComplaint() {
  const [complaintId, setComplaintId] = useState('');
  const [complaintInfo, setComplaintInfo] = useState(null);
  const [isReal, setIsReal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateComplaint = async () => {
    try {
      if (!complaintId) {
        setError('Ingrese el ID de la denuncia');
        return;
      }

      setLoading(true);

      const requestBody = {
        _id: complaintId,
        isReal: isReal,
      };

      const response = await fetch(`http://169.62.234.124:3009/api/corruptometro/complaints/${complaintId}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setComplaintInfo(data);
      } else {
        const data = await response.json();
        setError(data.message || 'Error al obtener la información de la denuncia');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);

      const requestBody = {
        _id: complaintId,
        isReal: isReal,
      };

      const response = await fetch('http://169.62.234.124:3009/api/corruptometro/complaints', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Error al actualizar la denuncia');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="complaintId" className="form-label">ID de la denuncia:</label>
          <input type="text" className="form-control" id="complaintId" value={complaintId} onChange={(e) => setComplaintId(e.target.value)} />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleUpdateComplaint}>
          Obtener Información de la Denuncia
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {complaintInfo && (
        <div>
          <h2>Veracidad de la Denuncia:</h2>
          <p>Estado Actual: {complaintInfo.isReal ? 'Verdadera' : 'Falsa'}</p>

          <div className="mb-3">
            <label htmlFor="isReal" className="form-label">Estado:</label>
            <select className="form-select" id="isReal" value={isReal} onChange={(e) => setIsReal(e.target.value === 'true')}>
              <option value="true">Verdadera</option>
              <option value="false">Falsa</option>
            </select>
          </div>

          <button type="button" className="btn btn-primary" onClick={handleUpdateStatus}>
            Actualizar Denuncia
          </button>
        </div>
      )}

      {success && <p className="text-success">Denuncia actualizada exitosamente</p>}
    </div>
  );
}

export default UpdateComplaint;