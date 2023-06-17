import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lockoutTime: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);
export default User;


