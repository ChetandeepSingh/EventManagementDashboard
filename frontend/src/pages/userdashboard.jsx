import React from 'react';
import EventCard from '../components/EventCard';
import './userdashboard.css';

const UserDashboard = () => {
  const events = [
    { id: 1, title: "Hackathon", description: "24hr coding challenge" },
    { id: 2, title: "Tech Talk", description: "Talk on AI & ML" },
    { id: 3, title: "Workshop",  description: "Hands-on React" },
    { id: 4, title: "Webinar",   description: "Django + JWT" },
  ];

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            showRegisterButton
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;