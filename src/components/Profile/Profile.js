import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './../PostList';
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to sign-in page if the user is not logged in
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ mt: 4, flex: 1 }}>
                <Grid container spacing={4}>
                    {/* Post List */}
                    <Grid item xs={12} md={8}>
                        <PostList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default Profile;
