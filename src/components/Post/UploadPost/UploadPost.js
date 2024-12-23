import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const UploadPost = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null); // Store the selected file
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user')); // Get user details from session storage

        if (!user) {
            setErrorMessage('You must be logged in to upload a post.');
            return;
        }

        if (!image) {
            setErrorMessage('Please select an image to upload.');
            return;
        }

        setLoading(true); // Show loading spinner

        try {
            // Create a FormData object to handle file uploads
            const formData = new FormData();
            formData.append('user', JSON.stringify(user)); // Add user data
            formData.append('caption', caption); // Add caption
            formData.append('image', image); // Add image file

            // Send the POST request with FormData
            const response = await axios.post('/posts', formData);

            // Reset form fields and redirect to the dashboard to show new post
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

    // Navigate back to dashboard
    const handleBackToHomeFeed = () => {
        navigate('/homeFeed');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
            <Container>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 500,
                        margin: 'auto',
                        padding: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <Navbar />
                    <Typography variant="h4" component="h1" sx={{ mb: 3 }} textAlign="center">
                        Upload a New Post
                    </Typography>
                    <TextField
                        label="Caption"
                        variant="outlined"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mb: 3 }}
                    >
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])} // Store selected file
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
                        sx={{ mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Post'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleBackToHomeFeed}
                    >
                        Back to Home
                    </Button>

                    {/* Success Snackbar */}
                    {successMessage && (
                        <Snackbar
                            open={!!successMessage}
                            autoHideDuration={3000}
                            onClose={() => setSuccessMessage('')}
                        >
                            <Alert onClose={() => setSuccessMessage('')} severity="success">
                                {successMessage}
                            </Alert>
                        </Snackbar>
                    )}

                    {/* Error Snackbar */}
                    {errorMessage && (
                        <Snackbar
                            open={!!errorMessage}
                            autoHideDuration={3000}
                            onClose={() => setErrorMessage('')}
                        >
                            <Alert onClose={() => setErrorMessage('')} severity="error">
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    )}
                </Box>
            </Container>
            <Footer sx={{ marginTop: 'auto' }} />
        </Box>
    );
};

export default UploadPost;
