import prisma from '../db.js';

// Create a new event
export const createEvent = async (eventData) => {
    const { name, description, startTime, endTime, location, createdById } = eventData;
    return await prisma.Event.create({
        data: {
            name,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            location,
            createdById
        }
    });
};

// Get all events
export const getEvents = async () => {
    return await prisma.Event.findMany({
        orderBy: { startTime: 'desc' }
    });
};

// Get event by ID
export const getEventById = async (eventId) => {
    return await prisma.Event.findUnique({
        where: { id: eventId }
    });
};

// Update event
export const updateEvent = async (eventId, updateData) => {
    // Accepts: { name, description, startTime, endTime, location }
    return await prisma.Event.update({
        where: { id: eventId },
        data: {
            ...updateData,
            startTime: updateData.startTime ? new Date(updateData.startTime) : undefined,
            endTime: updateData.endTime ? new Date(updateData.endTime) : undefined,
        }
    });
};

// Delete event
export const deleteEvent = async (eventId) => {
    return await prisma.Event.delete({
        where: { id: eventId }
    });
};

// Get all registrations for an event
export const getEventRegistrations = async (eventId) => {
    return await prisma.RegisteredEvent.findMany({
        where: { eventId },
        include: {
            user: { select: { id: true, name: true, email: true } }
        }
    });
};

// Get registration count for an event
export const getRegistrationCount = async (eventId) => {
    return await prisma.RegisteredEvent.count({
        where: { eventId }
    });
};
