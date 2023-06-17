import express from "express";
import { verifyUserToken, IsAdmin, IsModerator} from "../middleware/auth.js";
import { getUsers, getUserById, deleteUser, assignRole, revokeRole, removeAllModerators } from "../controllers/users.js";

export const userRouter = express.Router()

// Get all users 
userRouter.get('/users', verifyUserToken, IsAdmin, getUsers);

// Get a specific user with ID :userId
userRouter.get('/users/:userId', verifyUserToken, IsAdmin, getUserById);
  
// Delete a user by its ID
userRouter.delete('/users/:userId', verifyUserToken, IsAdmin, deleteUser);

// Assign moderator role to a user
userRouter.post('/users/assign-role', verifyUserToken, IsAdmin, assignRole);

// Revoke moderator role from a user
userRouter.post('/users/revoke-role', verifyUserToken, IsAdmin, revokeRole);

// Remove admin roles from the system 
userRouter.put('/users/remove-all-moderators', verifyUserToken, IsAdmin, removeAllModerators);

