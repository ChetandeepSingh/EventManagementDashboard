import React, { useState, useEffect } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // if editing, prefill
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !description) return;
    onSubmit({ title, description, id: initialData?.id });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">{initialData ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default EventForm;