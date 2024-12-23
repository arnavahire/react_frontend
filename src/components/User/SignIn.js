import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Footer from '../Footer/Footer';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/signin', {
                email,
                password,
            });

            console.log('User signed in:', response.data);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            navigate('/homeFeed');
            
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    const handleSignUp = () => {
        navigate('/signUp');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensure full height of the viewport
            }}
        >
            <Container maxWidth="xs" sx={{ flexGrow: 1 }}>
                <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" gutterBottom>
                        Not a user? Sign up!
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleSignUp}
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </Box>
            </Container>
            <Footer /> {/* Push footer to the bottom */}
        </Box>
    );
};

export default SignIn;
