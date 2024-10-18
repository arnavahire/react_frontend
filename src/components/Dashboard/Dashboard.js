import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './../UserList';
import PostList from './../PostList';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Dashboard = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to sign-in page if the user is not logged in
            navigate('/');
        }
    }, [user, navigate]);

    const handleCreatePost = () => {
        navigate('/createpost');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom align="center">
                Welcome to the Dashboard {user.username}
            </Typography>

            <Button
                variant="outlined"
                color="secondary"
                onClick={handleCreatePost}
                fullWidth
            >
                Create a Post!
            </Button>

            <PostList />
            <UserList />
            
        </div>
    );
};

export default Dashboard;