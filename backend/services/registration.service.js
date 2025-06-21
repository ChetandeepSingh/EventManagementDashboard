import prisma from '../prisma.js';

// Register a user for an event
export const registerForEvent = async (userId, eventId) => {
    // Prevent duplicate registration (unique constraint)
    try {
        const registration = await prisma.RegisteredEvent.create({
            data: {
                user: { connect: { id: userId } },
                event: { connect: { id: eventId } }
            }
        });
        return registration;
    } catch (error) {
        throw error;
    }
};

// Cancel a user's registration for an event
export const cancelRegistration = async (userId, registrationId) => {
    // Only allow deleting own registrations (userId match)
    const registration = await prisma.RegisteredEvent.findUnique({ where: { id: registrationId } });
    if (!registration) {
        throw new Error('Registration not found');
    }
    if (registration.userId !== userId) {
        throw new Error('Not authorized to cancel this registration');
    }
    await prisma.RegisteredEvent.delete({
        where: { id: registrationId }
    });
};

// Get all events the user is registered for
export const getMyRegistrations = async (userId) => {
    const registrations = await prisma.RegisteredEvent.findMany({
        where: { userId },
        include: { event: true }
    });
    // Return just the event details for frontend
    return registrations.map(reg => reg.event);
};
