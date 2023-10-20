import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js'
import authRouter from "./routes/auth.route.js"
dotenv.config();


const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log( "db connected");
})
.catch((error)=>{
    console.log(error.message);
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
    }
);

app.use("/api", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    res.status(statusCode).json({
        success : false,
        statusCode : statusCode,
        message
    });
})