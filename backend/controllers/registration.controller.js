import * as registrationService from '../services/registration.service.js';

// User registers for an event
export const registerForEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId } = req.body; // make sure frontend sends { "eventId": ... }

        const registration = await registrationService.registerForEvent(userId, eventId);
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not register for event.' });
    }
};

// User cancels their registration
export const cancelRegistration = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params; // registration id

        await registrationService.cancelRegistration(userId, Number(id));
        res.json({ message: 'Registration cancelled' });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not cancel registration.' });
    }
};

// User views all their registrations (events they signed up for)
export const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user.id;
        const registrations = await registrationService.getMyRegistrations(userId);
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Could not fetch registrations.' });
    }
};
