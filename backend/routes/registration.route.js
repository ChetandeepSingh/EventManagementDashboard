import express from 'express';
import * as registrationController from '../controllers/registration.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, registrationController.registerForEvent);
router.get('/me', auth, registrationController.getMyRegistrations);
router.delete('/:id', auth, registrationController.cancelRegistration);

export default router;
