import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import Footer from '../Footer/Footer';
import Logo from '../../assets/images/PicHaven.jpg';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isTextVisible, setIsTextVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users', {
                username,
                email,
                password,
            });

            setIsTextVisible(!isTextVisible);
            setUsername("");
            setEmail("");
            setPassword("");

            console.log('User registered:', response.data);

            // Optionally reset the form or redirect the user
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    const SignInAfterSignUp = () => {
        navigate('/')
    }

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Full viewport height
        }}
    >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Horizontally center
                    alignItems: 'center', // Vertically center
                }}
            >
                <img
                    src={Logo}
                    alt="PicHaven Logo"
                    style={{
                        width: '500px',
                        height: '350px'
                    }}
                
                />
                <Container maxWidth="xs" sx={{ flexGrow: 1 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
                    >
                        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                            Sign Up
                        </Typography>
                        <TextField
                            label="Username"
                            name="username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2, mb: 2 }}>
                            Sign Up
                        </Button>

                        {isTextVisible && (
                            <>
                                <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                                    Registration Successful!
                                </Typography>
                                <Button onClick={SignInAfterSignUp}>Sign In</Button>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>
            {/* Footer */}
            <Box
                sx={{
                    mt: 'auto', // Push footer to the bottom
                    width: '100%', // Full width
                }}
            >
                <Footer />
            </Box>
        </Box>
    );
};

export default SignUp;
