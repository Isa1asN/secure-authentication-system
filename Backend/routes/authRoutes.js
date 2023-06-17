import express from "express";
import {register, login, sendcode} from "../controllers/authController.js"
import { logout, deleteAccount } from "../controllers/authController.js";


export const authRouter = express.Router()

// Register a new User
authRouter.post('/register', register);

// send verification code
authRouter.post('/sendcode', sendcode);

// verify verification code and login
authRouter.post('/login', login);

// Logout 
authRouter.post('/logout', logout);

// Delete user Account
authRouter.delete('/deleteAccount', deleteAccount);

