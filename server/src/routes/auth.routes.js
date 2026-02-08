import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; 

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);

router.get('/me', authMiddleware, authController.getCurrentUser);
 
export default router;