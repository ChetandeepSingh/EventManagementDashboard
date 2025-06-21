import express from 'express';
import * as eventController from '../controllers/event.controller.js';
import auth from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/registration-count', eventController.getRegistrationCount);
router.post('/', auth, eventController.createEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.get('/:id/registrations', auth, eventController.getEventRegistrations);

export default router;
