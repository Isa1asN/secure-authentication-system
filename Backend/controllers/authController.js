import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from '../models/user.js';
import nodemailer from 'nodemailer';

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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAuth2',
      user: 'ztechguardian@gmail.com',
      clientId: '945059585802-klob9ikob3dvvgmlj8va3vfatv06r5gc.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04AnrSYxgt5OGCgYIARAAGAQSNwF-L9IrTSq508d5Wg2owhDgpSUmt_J6NNESQ_bbyle1u2rPNp2Eq-HeNRterHLPNKujFP1CDrQ',
      
  }
  });
  export const sendcode = async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).send("Invalid username");
      }
      
      // Check if the account is locked
      if (user.lockoutTime !== null) {
        const currentTime = new Date();
        const lockoutTime = user.lockoutTime;
        
        // Check if the lockout period has ended
        if (currentTime < lockoutTime) {
          const timeR = Math.ceil((lockoutTime - currentTime) / 1000); // Time remaining in seconds
          const timeRemaining = Math.ceil(timeR / 60); // Time remaining in minutes
          return res.status(403).json({ error: `Account locked. Please try again after ${timeRemaining} minutes.` });
        } else {
          // Reset failed login attempts and lockout time if the lockout period has ended
          user.failedLoginAttempts = 0;
          user.lockoutTime = null;
          await user.save();
        }
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // Increase failed login attempts
        user.failedLoginAttempts += 1;
  
        // Lock the account if it reaches the maximum allowed attempts
        if (user.failedLoginAttempts >= 3) {
          const lockoutDuration = 30 * 60 * 1000; // 30 minutes
          user.lockoutTime = new Date(Date.now() + lockoutDuration);
          await user.save();
          return res.status(403).json({ error: "Maximum login attempts exceeded. Account locked for 30 minutes." });
        }
  
        await user.save();
        return res.status(400).send("Invalid Password");
      }
  
      // Reset failed login attempts and lockout time if the login is successful
      user.failedLoginAttempts = 0;
      user.lockoutTime = null;
      await user.save();
  
      const email = user.email;
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
      user.verificationCode = verificationCode;
      await user.save();
  
      const mailOptions = {
        from: "ztechguardian@gmail.com",
        to: email,
        subject: 'Verification Code',
        html: `
          <h2>Hello ${user.firstName},</h2>
          <p>You recently requested a verification code to log in to your account. Please use the following verification code to log in.</p>
          <h1>${verificationCode}</h1>
          <p>Just enter the code in the field to log in.</p>
        `
      };
  
      await transporter.sendMail(mailOptions);
      console.log("message sent");
  
      res.json({ message: `Email sent to ${email} with further instructions.` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
// LOGGING IN 
export const login = async (req, res) => {
    const { userName, code } = req.body;
  
    try {
      const user = await User.findOne({ userName });
      if (!user) return res.status(400).send("Invalid username ");
      // Verify verification code
      if (user.verificationCode !== code) {
        return res.status(400).json({ error: 'Invalid verification code.' });
      }
      else {
      user.verificationCode = null; 
      await user.save();
      const payload = { id: user._id, email: user.email}; 
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

      res.cookie("token", token, { httpOnly: true, secure: true });
      res["token"] = token
      res.status(200).json({ token, user });
      console.log("A user Logged in")}
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
  
