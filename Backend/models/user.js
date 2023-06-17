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
        email :{
            type: String,
            required: true,
            max:50,
            unique:true
        },
        password :{
            type: String,
            required: true,
            min:5,
        },
        role : {
            type: String,
            enum: ['learner', 'moderator', 'admin'], 
            default:"learner",
            required : true,
        },
        passwordResetCode: {
            type: String,
            default: null
          }
    },
    {timeStamps: true}
)

const User = mongoose.model("User", UserSchema);
export default User;