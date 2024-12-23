import React, { useState } from 'react';
import { Box, List, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
// ICONS
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '../User/Logout';

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    // isActive is used to determine which page in the navbar we are currently on.
    const isActive = (path) => location.pathname === path;

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
            }}
        >
            <List>
                <ListItemButton
                    onClick={() => handleNavigation('/homeFeed')}
                    sx={{
                        marginTop: 3,
                        backgroundColor: isActive('/homeFeed') ? '#555' : 'transparent',
                        '&:hover': { backgroundColor: '#444' }       
                     }}>
                    <HomeIcon sx={{ marginRight: 3 }} />
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleNavigation('/profile')}
                    sx={{
                        marginTop: 3,
                        backgroundColor: isActive('/profile') ? '#555' : 'transparent',
                        '&:hover': {backgroundColor: '#444'}
                     }}>
                    <PersonIcon sx={{ marginRight: 3 }} />
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleNavigation('/uploadPost')}
                    sx={{
                        marginTop: 3,
                        backgroundColor: isActive('/uploadPost') ? '#555' : 'transparent',
                        '&:hover': {backgroundColor: '#444'}
                     }}>
                    <AddCircleOutlineIcon sx={{ marginRight: 3 }} />
                    <ListItemText primary="Upload" />
                </ListItemButton>
                <ListItemButton
                    onClick={handleModalOpen}
                    sx={{
                        marginTop: 3,
                        backgroundColor: isActive('/logout') ? '#555' : 'transparent',
                        '&:hover': {backgroundColor: '#444'}
                     }}>
                    <LogoutIcon sx={{ marginRight: 3 }} />
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
            <Logout open={open} onClose={handleModalClose} />
        </Box>
    );
};

export default Navbar;
