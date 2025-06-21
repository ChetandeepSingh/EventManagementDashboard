import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([
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
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (newEvent) => {
    setEvents([{ id: Date.now(), ...newEvent }, ...events]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="organizer-dashboard-container">
      <div className="header">
        <h2>Your Events</h2>
        <button className="create-btn" onClick={() => setShowModal(true)}>
          + Create Event
        </button>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            showEditButtons
            onDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Create New Event</h3>
            <EventForm onSubmit={handleCreate} />
            <button className="close-modal" onClick={() => setShowModal(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;