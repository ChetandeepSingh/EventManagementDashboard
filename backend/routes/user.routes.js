import express from 'express';
import {loginHandler, registerHandler, logoutHandler } from '../controllers/user.controllers.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', authenticate, logoutHandler);

export default router;