import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log( "db connected");
})
.catch((error)=>{
    console.log(error);
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
    }
);

app.use("/api", userRouter);