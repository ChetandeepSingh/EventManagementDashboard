import React from 'react';
import './EventCard.css'; 

const EventCard = ({ event, showRegisterButton, showEditButtons }) => {
  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>

      {showRegisterButton && <button className="event-button">Register</button>}
      {showEditButtons && (
        <div className="event-button-group">
          <button className="event-button">Edit</button>
          <button className="event-button delete">Delete</button>
        </div>
      )}
    </div>
  );
};

export default EventCard;