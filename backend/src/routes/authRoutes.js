import express from 'express';
import { loginHandler, registerHandler } from '../controllers/authController.js';
import validateResMiddleware from '../middlewares/validateResMiddleware.js';
import { createUserValidator } from '../validator/userValidator.js';

const router = express.Router();

// Register: accepts user fields + optional `role` ("client"|"freelance") and optional `profile` object for role-specific fields
router.post('/register', createUserValidator, validateResMiddleware, registerHandler);
router.post('/login', validateResMiddleware, loginHandler);

export default router;
