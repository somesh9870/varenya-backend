import express from "express";
import { login, singupUser } from "../controllers/userController.mjs";


const userRouter = express.Router();

// Registration Route User Register with  email, password and name-----
userRouter.post("/register",singupUser );

// POST Route for Login user using Credentials--------------------------------
userRouter.post("/login", login);

export default userRouter;
