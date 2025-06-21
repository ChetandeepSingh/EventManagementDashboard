import React from 'react';
import EventCard from '../components/EventCard';

const UserDashboard = () => {
  const events = [
    { id: 1, title: "Hackathon", description: "24hr coding challenge" },
    { id: 2, title: "Tech Talk", description: "Talk on AI & ML" }
  ];

  return (
    <div>
      <h2>User Dashboard</h2>
      {events.map(event => (
        <EventCard key={event.id} event={event} showRegisterButton />
      ))}
    </div>
  );
};

export default UserDashboard;
