import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        try {
            const response = await axios.post('/posts', {
                user,
                caption,
                imageUrl
            });
            console.log('Post created:', response.data);
            // Optionally reset the form or show success message
            setCaption('');
            setImageUrl('');

            setIsTextVisible(!isTextVisible);

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const BackToDashboard = () => {
        navigate('/dashboard')
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}
        >
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Create Post
            </Typography>
            <TextField
                label="Caption"
                variant="outlined"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
                sx={{ mb: 2 }} // Margin bottom
            />
            <TextField
                label="Image URL"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                sx={{ mb: 2 }} // Margin bottom
            />
            <Button variant="contained" color="primary" type="submit">
                Create Post
            </Button>

            {isTextVisible && (
                <><Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                    Post Successfully Uploaded!
                </Typography>
                <Button onClick={BackToDashboard}>Back to Dashboard</Button></>
            )}
        </Box>
    );
};

export default CreatePost;
