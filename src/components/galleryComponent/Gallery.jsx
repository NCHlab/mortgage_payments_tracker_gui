import React from 'react';
import ImageGallery from 'react-image-gallery';

import useGallery from './useGallery';
import 'react-image-gallery/styles/css/image-gallery.css'

import { Container } from '@mui/material';

const Gallery = () => {
    const { images } = useGallery();

    return (
        <Container sx={{ pt: 5 }}>
            <ImageGallery items={images} />
        </Container>

    );
};

export default Gallery;
