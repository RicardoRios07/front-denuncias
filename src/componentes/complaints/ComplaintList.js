import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, FormControl, Select, InputLabel, MenuItem, Grid } from '@mui/material';

function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    const url = 'https://back-barrios-462cb6c76674.herokuapp.com/denuncias/getDenunciasUser';

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setComplaints(data);
      } else {
        console.error('Error al obtener las denuncias');
        setError(true);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const getGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  };

  return (
    <div className="container">
      <form>
        {/* ... (form inputs) */}
        <Button variant="contained" color="primary" type="submit">
          Buscar denuncias
        </Button>
      </form>

      {loading ? (
        <p>Cargando denuncias...</p>
      ) : error ? (
        <p>Error al obtener las denuncias</p>
      ) : (
        <div>
          {complaints.length > 0 ? (
            <Grid container spacing={2}>
              {complaints.map((complaint) => (
                <Grid key={complaint._id} item xs={12} sm={6} md={4}>
                  <Card>
                    {complaint.evidencia && (
                      <div className="card-image">
                        <img src={complaint.evidencia} alt="Evidencia" />
                      </div>
                    )}
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {complaint.tituloDenuncia}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {truncateDescription(complaint.descripcion, 100)}
                      </Typography>
                      <Typography>Categoría: {complaint.categoria}</Typography>
                      <Typography>Estado: {complaint.estado}</Typography>
                      <Typography>Fecha y hora: {complaint.fechaHora}</Typography>
                      <Typography>
                        Ubicación:{' '}
                        <a href={getGoogleMapsLink(complaint.ubicacion.coordenadas[1], complaint.ubicacion.coordenadas[0])} target="_blank" rel="noopener noreferrer">
                          Ver en Google Maps
                        </a>
                      </Typography>
                      <Typography>Denunciante: {complaint.nombreDenunciante}</Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button color="primary" variant="contained" onClick={() => setSelectedComplaint(complaint)}>Ver Más</Button>
                        <Button color="success" variant="contained">Atender</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p>No se encontraron denuncias</p>
          )}
        </div>
      )}

      {selectedComplaint && (
        <div className="fixed-top">
          <div className="card-overlay"></div>
          <Card className="overlay-card" style={{ maxWidth: '540px', margin: '50px auto' }}>
            {selectedComplaint.evidencia && (
              <div className="card-image">
                <img src={selectedComplaint.evidencia} alt="Evidencia" />
              </div>
            )}
            <CardContent>
              <Typography variant="h5" component="h2">
                {selectedComplaint.tituloDenuncia}
              </Typography>
              <Typography>{selectedComplaint.descripcion}</Typography>
              <Typography>Categoría: {selectedComplaint.categoria}</Typography>
              <Typography>Estado: {selectedComplaint.estado}</Typography>
              <Typography>Fecha y hora: {selectedComplaint.fechaHora}</Typography>
              <Typography>
                Ubicación:{' '}
                <a href={getGoogleMapsLink(selectedComplaint.ubicacion.coordenadas[1], selectedComplaint.ubicacion.coordenadas[0])} target="_blank" rel="noopener noreferrer">
                  Ver en Google Maps
                </a>
              </Typography>
              <Typography>Denunciante: {selectedComplaint.nombreDenunciante}</Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="danger" variant="contained" onClick={() => setSelectedComplaint(null)}>X</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default ComplaintsList;