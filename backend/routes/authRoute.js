import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/authController.js';
import { authMiddlewares } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup',signup);
 authRouter.post('/login',login);
 authRouter.post('/logout',logout);
authRouter.put('/update-profile',authMiddlewares,updateProfile);

authRouter.get('/check',authMiddlewares,checkAuth);
export default authRouter;