import React from 'react';

const EventCard = ({ event, showRegisterButton, showEditButtons }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem 0' }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      {showRegisterButton && <button>Register</button>}
      {showEditButtons && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
};

export default EventCard;