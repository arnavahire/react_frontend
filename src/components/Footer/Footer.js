import React from "react";
import { Typography, Box } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                mt: 4,
                py: 2,
                textAlign: 'center',
                bgcolor: '#3f51b5',
                color: '#fff',
                marginTop: 'auto' 
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} PicHaven. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;