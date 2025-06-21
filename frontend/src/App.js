import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/login';
// import Register from './pages/register';
import OrganizerDashboard from './pages/organizerdashboard';
import UserDashboard from './pages/userdashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="" element={<Register />} /> */}
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;