import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserList from './components/UserList';
import PostList from './components/PostList';
import CreatePost from './components/Post/CreatePost/CreatePost';
import SignUp from './components/User/SignUp';
import SignIn from './components/User/SignIn';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
    return (

      <Router>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
        
    );
};

export default App;

/*
<div>
    <h1>Welcome to My Instagram</h1>

    <h2>Users:</h2>
    <UserList />

    <SignUp />

    <SignIn />

    <h2>Posts:</h2>
    <PostList />

    <CreatePost />
</div> */