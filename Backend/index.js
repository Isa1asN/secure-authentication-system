import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {authRouter} from "./routes/authRoutes.js"
import { userRouter } from "./routes/users.js";
import { profileRouter } from "./routes/profile.js";
import { courseRouter } from "./routes/progress.js";
import { wordRouter } from "./routes/wordOfTD.js";
import {todaysWordRouter} from "./routes/todaysWord.js"
import {vocabRouter} from "./routes/vocabulary.js"
dotenv.config();

const app = express();
app.use(bodyParser.json());


// Auth related routes
app.use('/auth', authRouter);

// Users related routes
app.use('/api', userRouter);

// Profile route
app.use('/api', profileRouter);

// course progress route
app.use('/course-progress', courseRouter);

// word of the day route
app.use('/wordOfTD', wordRouter)

// Today's word route
app.use('/api', todaysWordRouter)

// Vocabulary route
app.use('/api', vocabRouter)

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server runnning on port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))



