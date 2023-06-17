import User from "../models/user.js";
import WordOfTD from "../models/wordOfTD.js";

// Getting all users
export const getUsers = async (req, res) => {
    try {
      const users = await User.find({ role: { $ne: "admin" } });

      const words = await WordOfTD.find({});

      
      res.json({ users : users, words : words });
      console.log("users loaded")
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Getting a user by its id
  export const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ user });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Delete a user by its ID
 export const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Assign a moderator role to a user
export const assignRole = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = "moderator";
    await user.save();

    console.log("learner promoted to moderator")
    return res.json({ message: 'Role assigned successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Revoke the moderator role from a user
export const revokeRole = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.role = 'learner';
    await user.save();

    console.log("moderator role revoked ")
    return res.json({ message: 'Role revoked successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Remove all moderator roles from the system
export const removeAllModerators = async (req, res) => {
  try {
    await User.updateMany({ role: 'moderator' }, { role: 'learner' });

    return res.json({ message: 'All moderator roles removed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

