import express from 'express';
import { checkAuth, logIn, logOut, signUp, updateProfile } from '../controllers/auth.controller.js';
import isAuth from '../middleware/isAuth.middleware.js';

const authRouter = express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",logIn);
authRouter.post("/logout",logOut);
authRouter.put("/update-profile", isAuth, updateProfile);
authRouter.get("/check-auth", isAuth, checkAuth);

export default authRouter;