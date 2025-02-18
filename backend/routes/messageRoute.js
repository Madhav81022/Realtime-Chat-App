import express from 'express';
import { authMiddlewares } from '../middlewares/authMiddleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/messageController.js';

const messageRouter=express.Router();

messageRouter.get('/users',authMiddlewares,getUsersForSidebar);
messageRouter.get('/:id',authMiddlewares,getMessages);

messageRouter.post('/send/:id',authMiddlewares,sendMessage)
export default messageRouter;