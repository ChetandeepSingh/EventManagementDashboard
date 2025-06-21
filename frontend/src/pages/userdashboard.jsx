import React from 'react';
import EventCard from '../components/EventCard';
import './UserDashboard.css';

const UserDashboard = () => {
  const events = [
    {
      id: 1,
      title: "Hackathon",
      date: "2025-07-10",
      time: "09:00",
      location: "Online",
      description: "24hr coding challenge"
    },
    {
      id: 2,
      title: "Tech Talk",
      date: "2025-07-15",
      time: "14:30",
      location: "Auditorium A",
      description: "Deep dive into AI & ML"
    },
    {
      id: 3,
      title: "Workshop",
      date: "2025-07-20",
      time: "11:00",
      location: "Lab 3",
      description: "Hands-on React session"
    },
    {
      id: 4,
      title: "Webinar",
      date: "2025-07-25",
      time: "16:00",
      location: "Zoom",
      description: "Building Django + JWT APIs"
    },
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