import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from './../UserList';
import PostList from './../PostList';
import CreatePost from '../Post/CreatePost/CreatePost';
// import CreatePost from './components/Post/CreatePost/CreatePost';

const Dashboard = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to sign-in page if the user is not logged in
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Welcome to the Dashboard {user.username}</h1>

            <PostList />
            <UserList />
            <CreatePost />

        </div>
    );
};

export default Dashboard;