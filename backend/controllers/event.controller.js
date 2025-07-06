import * as eventService from '../services/event.service.js';

// Create a new event (Organizer)
import prisma from '../db.js'; // or wherever your Prisma client is

export const createEvent = async (req, res) => {
    try {
        const createdById = req.user.id;
        const { name, description, startTime, endTime, location } = req.body;

        const user = await prisma.User.findUnique({ where: { id: createdById } });

        if (!user || user.role !== 'organizer') {
            return res.status(403).json({ error: 'Only organizers can create events.' });
        }

        const event = await eventService.createEvent({
            name,
            description,
            startTime,
            endTime,
            location,
            createdById
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not create event.' });
    }
};


// List all events
export const getEvents = async (req, res) => {
    try {
        const events = await eventService.getEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Could not fetch events.' });
    }
};

// Get event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(Number(id));
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Could not fetch event.' });
    }
};

// Update event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, startTime, endTime, location } = req.body;
        const user = await prisma.User.findUnique({ where: { id: req.user.id } });
        if (!user || user.role !== 'organizer') {
            return res.status(403).json({ error: 'Only organizers can update events.' });
        }
        const event = await eventService.updateEvent(Number(id), { name, description, startTime, endTime, location });
        res.json(event);
    } catch (error) {
        res.status(404).json({ error: error.message || 'Event not found or update failed.' });
    }
};

// Delete event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventService.deleteEvent(Number(id));
        const user = await prisma.User.findUnique({ where: { id: req.user.id } });
        if (!user || user.role !== 'organizer') {
            return res.status(403).json({ error: 'Only organizers can delete events.' });
        }
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message || 'Event not found or delete failed.' });
    }
};

// Get all registrations for an event (Organizer)
export const getEventRegistrations = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await eventService.getEventRegistrations(Number(id));
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Could not fetch registrations.' });
    }
};

// Get registration count for an event
export const getRegistrationCount = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await eventService.getRegistrationCount(Number(id));
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Could not fetch registration count.' });
    }
};
