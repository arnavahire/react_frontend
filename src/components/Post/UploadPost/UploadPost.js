import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const UploadPost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user) {
            setErrorMessage('You must be logged in to upload a post.');
            return;
        }

        if (!image) {
            setErrorMessage('Please select an image to upload.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('user', JSON.stringify(user));
            formData.append('caption', caption);
            formData.append('image', image);

            const response = await axios.post('/posts', formData);

            setCaption('');
            setImage(null);
            handleBackToHomeFeed();
        } catch (error) {
            console.error('Error uploading post:', error);
            setErrorMessage('Failed to upload post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHomeFeed = () => {
        navigate('/homeFeed');
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f9f9f9' }}>
            <Navbar />
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            p: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Typography variant="h4" component="h1" sx={{ mb: 3 }} textAlign="center">
                            Upload a New Post
                        </Typography>
                        <TextField
                            label="Caption"
                            variant="outlined"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            required
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ mb: 3 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Button>
                        {image && (
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Selected Image: {image.name}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Post'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleBackToHomeFeed}
                            fullWidth
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default UploadPost;
