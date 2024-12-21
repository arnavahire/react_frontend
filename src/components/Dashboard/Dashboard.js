import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './../UserList';
import PostList from './../PostList';
import Navbar from './../Navbar/Navbar';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';

const Dashboard = () => {
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
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Welcome to the Dashboard, {user?.username}!
                </Typography>

                <Grid container spacing={4}>
                    {/* Post List */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                            Recent Posts
                        </Typography>
                        <PostList />
                    </Grid>

                    {/* User List (Visible only for admins) */}
                    {user?.role === 'admin' && (
                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" gutterBottom>
                                User Management
                            </Typography>
                            <UserList />
                        </Grid>
                    )}
                </Grid>
            </Container>

            {/* Footer */}
            <Box
                sx={{
                    mt: 4,
                    py: 2,
                    textAlign: 'center',
                    bgcolor: '#3f51b5',
                    color: '#fff',
                }}
            >
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Instagram Clone. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
