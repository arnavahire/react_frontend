import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <CircularProgress />; // Show a loading spinner while fetching
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User List
            </Typography>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.username} secondary={user.email} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UserList;
