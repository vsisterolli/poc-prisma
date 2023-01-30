import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { validateSignIn, validateSignUp } from "../middlewares/validation.middleware.js";

const usersRouter: Router = Router();

usersRouter.post('/signup', validateSignUp, signUp);
usersRouter.post('/signin', validateSignIn, signIn);

export default usersRouter;