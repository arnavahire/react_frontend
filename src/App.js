import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPost from './components/Post/UploadPost/UploadPost';
import SignUp from './components/User/SignUp';
import SignIn from './components/User/SignIn';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
    return (

      <Router>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/uploadPost" element={<UploadPost />} />
        </Routes>
      </Router>
        
    );
};

export default App;