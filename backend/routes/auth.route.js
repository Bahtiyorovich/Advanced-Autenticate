import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from './../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activation/:id', authController.activation)
router.get('/refresh', authController.refresh)
router.get('/users', authMiddleware, authController.getUsers)

export default router;