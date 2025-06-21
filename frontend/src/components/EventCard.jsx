import React from 'react';
import './EventCard.css';

const EventCard = ({ event, showRegisterButton, showEditButtons, onEdit, onDelete }) => {
  const { title, date, time, location, description } = event;

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{title}</h3>
        <div className="event-datetime">
          <span>{date}</span> • <span>{time}</span>
        </div>
      </div>
      <p className="event-location">📍 {location}</p>
      <p className="event-description">{description}</p>

      <div className="event-actions">
        {showRegisterButton && <button className="event-btn">Register</button>}
        {showEditButtons && (
          <>
            <button className="event-btn" onClick={onEdit}>Edit</button>
            <button className="event-btn delete" onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;