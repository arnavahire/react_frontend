import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
const Logout = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        //remove user from the session
        sessionStorage.removeItem('user');
        // I want to close the dialog box before I log out
        onClose();
        // redirect to sign in page
        navigate('/signIn');
    }

    return (

        // React.Fragment is a wrapper component used for avoiding adding new divs to the div.
        <React.Fragment> 
            <Dialog open={open} onClose={onClose}>
                <DialogTitle id="logout-title">
                    {"Log out"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Are you sure you want to log out ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        <Typography>
                            Yes
                        </Typography>
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        <Typography>
                            Cancel
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Logout;
