import express from 'express';
import isAuth from '../middleware/isAuth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get("/users", isAuth, getUsersForSidebar);
messageRouter.get("/:id", isAuth, getMessages);
messageRouter.post("/send/:id", isAuth, sendMessage);

export default messageRouter;