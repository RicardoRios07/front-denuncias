import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Footer from '../Footer/Footer';

const categories = ['Seguridad', 'Infraestructura', 'Contaminacion', 'Ruido'];

function ComplaintForm() {
  const [tituloDenuncia, setTituloDenuncia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [evidencia, setEvidencia] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tituloDenuncia', tituloDenuncia);
    formData.append('descripcion', descripcion);
    formData.append('evidencia', evidencia);
    // formData.append('ubicacion', JSON.stringify({ type: 'Point', coordenadas: [coords.longitude, coords.latitude] }));
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

  // Hook useEffect para obtener la ubicación del usuario al cargar la página
  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // Habilitar alta precisión
      maximumAge: 0, // No utilizar una ubicación en caché
      timeout: 5000, // Tiempo máximo para obtener la ubicación
    };

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setSelectedLocation({ lat: latitude, lng: longitude });
      setLoading(false);
    };

    const errorCallback = (error) => {
      console.error('Error al obtener la ubicación del usuario:', error);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

  }, []);

  function LocationMarker() {
    // Hook useMapEvents para escuchar el evento click en el mapa
    const map = useMapEvents({
      click(e) {
        setSelectedLocation(e.latlng);
      },
    });

    // Devolvemos null para que no se muestre un marcador en la ubicación del usuario
    return null;
  }


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
            {loading ? (
              <p>Obteniendo ubicación...</p>
            ) : selectedLocation ? (
              <MapContainer
                center={[selectedLocation?.lat || 0, selectedLocation?.lng || 0]}
                zoom={13}
                style={{ height: '300px', width: '100%' }}
              >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {selectedLocation && (
                <Marker position={selectedLocation}>
                  <Popup>Ubicación seleccionada</Popup>
                </Marker>
              )}
              <LocationMarker />
              </MapContainer>
            ) : (
              <p>No se pudo obtener la ubicación.</p>
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