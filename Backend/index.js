import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {authRouter} from "./routes/authRoutes.js"
import { profileRouter } from "./routes/profile.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());


// Auth related routes
app.use('/auth', authRouter);

// Profile route
app.use('/api', profileRouter);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server runnning on port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))



