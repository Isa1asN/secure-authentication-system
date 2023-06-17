import express from "express";
import {register, login} from "../controllers/authController.js"
import { verifyUserToken, IsAdmin, IsUser } from "../middleware/auth.js";
import { forgotPassword, resetPassword } from '../controllers/forgotPassword.js';
import { logout, deleteAccount } from "../controllers/authController.js";


export const authRouter = express.Router()

// Register a new User
authRouter.post('/register', register);

// Login
authRouter.post('/login', login);

// Forgot Password
authRouter.post('/forgotPassword', forgotPassword);

// Reset Password
authRouter.post('/resetPassword', resetPassword);

// Logout 
authRouter.post('/logout', logout);

// Delete user Account
authRouter.delete('/deleteAccount', deleteAccount);

