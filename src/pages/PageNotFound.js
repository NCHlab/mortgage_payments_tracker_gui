import React from 'react'
import { Button, Container, Typography, Grid } from '@mui/material';

const PageNotFound = () => {
    return (

        <Container align="center" sx={{ my: 35, border: "6px inset #000" }}>
            <Typography variant="h2">
                404 Not Found
            </Typography>
            <Typography>
                Sorry the page you tried going to is not available.
            </Typography>
            <Typography>
                Ensure you are logged in to access pages behind secure access.
            </Typography>
        </Container>


    )
}

export default PageNotFound
