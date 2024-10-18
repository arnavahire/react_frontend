import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/signin', {
                email,
                password,
            });

            // for viewing the logs on front end
            console.log('User signed in:', response.data);

            sessionStorage.setItem('user', JSON.stringify(response.data));

            // Handle successful login, e.g., store user data or redirect
            navigate('/dashboard');

        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    const SignUp = () => {
        navigate('/signup')
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>

            <h4>Not a user? Sign up!</h4>
            
            <button onClick={navigate('/signup')}>Sign Up</button>

        </div>
    );
};

export default SignIn;
