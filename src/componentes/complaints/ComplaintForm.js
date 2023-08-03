import React, { useState } from 'react';
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGeolocated } from "react-geolocated";

const categories = ['Seguridad', 'Infraestructura', 'Contaminacion', 'Ruido'];

function ComplaintForm({ isGeolocationAvailable, isGeolocationEnabled }) {
  const [tituloDenuncia, setTituloDenuncia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [evidencia, setEvidencia] = useState(null);
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tituloDenuncia', tituloDenuncia);
    formData.append('descripcion', descripcion);
    formData.append('evidencia', evidencia);
    formData.append('ubicacion', JSON.stringify({ type: 'Point', coordenadas: [coords.longitude, coords.latitude] }));
    formData.append('categoria', categoria);

    try {
      const response = await fetch('https://back-barrios-462cb6c76674.herokuapp.com/denuncias/nuevaDenuncia', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Denuncia creada exitosamente');
        console.log('Denuncia creada exitosamente');
      } else {
        alert('Error al crear la denuncia');
        console.error('Error al crear la denuncia');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Aquí utilizamos la función useGeolocated para obtener la geolocalización
  const geolocation = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const coords = geolocation && geolocation.coords;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título de la denuncia"
              variant="outlined"
              required
              value={tituloDenuncia}
              onChange={(e) => setTituloDenuncia(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="categoria-label">Categoría</InputLabel>
              <Select
                labelId="categoria-label"
                id="categoria"
                label="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {geolocation.isGeolocationAvailable && geolocation.isGeolocationEnabled ? (
              <div>
                <p>Comparta su ubicación:</p>
                <p>Latitud: {geolocation.coords?.latitude}</p> {/* Usamos el operador opcional ?. para verificar coords */}
                <p>Longitud: {geolocation.coords?.longitude}</p> {/* Usamos el operador opcional ?. para verificar coords */}
              </div>
            ) : (
              <p>No se puede obtener la ubicación.</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="evidencia">Evidencia</InputLabel>
            <input
              accept="image/*"
              id="evidencia"
              type="file"
              onChange={(e) => setEvidencia(e.target.files[0])}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar Denuncia
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ComplaintForm;