import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography variant="h1">404</Typography>
            <Typography variant="h4">Página no encontrada</Typography>
            <Typography variant="body1">
                Lo sentimos, la página que estás buscando no existe.
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
                Volver al inicio
            </Button>
        </Box>
    );
};

export default NotFound;