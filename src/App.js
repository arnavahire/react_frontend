import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPost from './components/Post/UploadPost/UploadPost';
import SignUp from './components/User/SignUp';
import SignIn from './components/User/SignIn';
import HomeFeed from './components/HomeFeed/HomeFeed';
import Profile from './components/Profile/Profile';
import Logout from './components/User/Logout';

const App = () => {
    return (

      <Router>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/homeFeed" element={<HomeFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploadPost" element={<UploadPost />} />
          <Route path="/logout" element={<Logout />} />  {/* TODO */}
        </Routes>
      </Router>
        
    );
};

export default App;