import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js"

// REGISTERING USER

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            email,
            password
        } = req.body;
        // console.log(req.body)
        let oldUser = await User.findOne({ email: email });
        let oldUser2 = await User.findOne({ userName: userName });
        if (oldUser || oldUser2) {
            throw new Error("Email or user already exist");
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: passwordHash
        })

        const savedUser = await newUser.save();        
        console.log("A user signed up")

        const responseUser = savedUser.toObject();
        delete responseUser.verificationCode;
        delete responseUser.password;
        res.status(201).json(responseUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// LOGGING IN 
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send("Invalid Email ");
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid Password");
  
      const payload = { id: user._id, email: user.email, role: user.role }; 
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

      res.cookie("token", token, { httpOnly: true, secure: true });
      res["token"] = token
      res.status(200).json({ token , "role":payload.role});
      console.log("A user Logged in")
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };

//   Logging out
export const logout = async (req, res) => {
    res.clearCookie("token");
    
    res.status(200).send("Logout Successful");
  };
    
// Deleting user account
export const deleteAccount = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("User not found");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Invalid credentials");
  
      await User.findByIdAndDelete(user._id);
      res.clearCookie("token");
      res.status(200).send("Account deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  };
  
