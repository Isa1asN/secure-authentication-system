import express from "express";
import { viewProfile, changeEmail } from "../controllers/profile.js";
import { verifyUserToken } from "../middleware/auth.js";

export const profileRouter = express.Router()

// Route to view user profile
profileRouter.get('/:userId/profile', verifyUserToken, viewProfile);

// to change email
profileRouter.put('/:userId/change-email', verifyUserToken, changeEmail);
