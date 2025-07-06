import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;