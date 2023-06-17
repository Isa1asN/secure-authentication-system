import User from '../models/user.js';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'afanoroapp@gmail.com',
        clientId: '789412747365-c5aj0vrnk4vsedap5m0rsm3hm5jgmu3v.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04FMyOyHLHJhYCgYIARAAGAQSNwF-L9IrtKXc7YFHEtRW6_1XkLHUhCu22sJa2oTTgAJEgII2ErZzd6rECRpP6hu1soHXlRXwxS4',
           
    }
    });

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    user.passwordResetCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: "afanoroapp@gmail.com",
      to: email,
      subject: 'Password Reset', 
      html: `
        <h3>Hello ${user.firstName},</h3>
        <p>You recently requested to reset your password for your account. Please use the following verification code to reset your password.</p>
        <h1>${verificationCode}</h1>
        <p>If you did not request a password reset, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("message sent")

    res.json({ message: `Email sent to ${email} with further instructions.` });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify verification code
    if (user.passwordResetCode !== code) {
      return res.status(400).json({ error: 'Invalid verification code.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.passwordResetCode = null; 
    await user.save();

    res.json({ message: 'Password updated successfully.' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
