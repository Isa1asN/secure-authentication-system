import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName :{
            type: String,
            required: true,
            min:3,
            max:50
        },
        lastName :{
            type: String,
            required: true,
            min:3,
            max:50
        },
        userName :{
            type: String,
            required: true,
            min:3,
            max:50,
            unique:true
        },
        email :{
            type: String,
            required: true,
            max:50,
            unique:true
        },
        password :{
            type: String,
            required: true,
            min:3,
        },
        verificationCode: {
            type: String,
            default: null
          }
    },
    {timeStamps: true}
)

const User = mongoose.model("User", UserSchema);
export default User;