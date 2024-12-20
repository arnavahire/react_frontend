import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

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
        <div>
            

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
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
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Sign Up
                </Button>

                {isTextVisible && (
                    <><Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                        Registration Successful!
                    </Typography>
                    <Button onClick={SignInAfterSignUp}>Sign In</Button></>
                )}
            </Box>
        </div>
    );
};

export default SignUp;
