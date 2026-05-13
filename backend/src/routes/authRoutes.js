import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  logout,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.put('/profile', authenticate, updateProfile);
router.post('/change-password', authenticate, changePassword);
router.post('/logout', authenticate, logout);

export default router;
