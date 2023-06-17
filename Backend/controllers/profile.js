import User from "../models/user.js";

// Profile view 
export const viewProfile = async (req, res) => {
    try {
      const { userId } = req.params;
        const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Change email of the user
export const changeEmail = async (req, res) => {
    try {
      const { userId } = req.params;
      const { email } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.email = email;
      await user.save();
  
      return res.json({ message: 'Email changed successfully', user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  