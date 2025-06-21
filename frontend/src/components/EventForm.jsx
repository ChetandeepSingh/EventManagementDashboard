import React, { useState, useEffect } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date);
      setTime(initialData.time);
      setLocation(initialData.location);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !date || !time || !location || !description) return;
    onSubmit({ title, date, time, location, description, id: initialData?.id });
    // reset only on create:
    if (!initialData) {
      setTitle(''); setDate(''); setTime(''); setLocation(''); setDescription('');
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="date-time-group">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
      </div>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button type="submit" className="submit-btn">
        {initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;