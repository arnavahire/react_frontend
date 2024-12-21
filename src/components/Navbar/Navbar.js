import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleUploadPost = () => {
        navigate('/uploadPost');
    };

    return (
        <Box
            sx={{
                width: '200px',
                height: '100vh',
                backgroundColor: '#333',
                color: 'white',
                position: 'fixed',
                top: 0,
                left: 0,
                padding: '20px',
            }}
        >
            <List>
                <ListItem button>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Posts" />
                </ListItem>
                <ListItem button onClick={handleUploadPost}>
                    <ListItemText primary="Upload" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Navbar;
