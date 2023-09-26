import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './router/auth.js';
import userRouter from './router/user.js';
import productRouter from './router/product.js';
import cartRouter from './router/cart.js';
import orderRouter from './router/order.js';
import passwordRouter from './router/resetPassword.js';
import blogRouter from './router/blog.js';
import newsLetterRouter from './router/newsletter.js';
import feedBackRouter from './router/feedback.js';

const app = express();
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/password", passwordRouter);
app.use("/api/blog", blogRouter);
app.use("/api/newsletter",newsLetterRouter);
app.use("/api/feedback",feedBackRouter);



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DataBase");
    } catch (error) {
        console.log(error);
    }
}


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went Wrong!!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(process.env.PORT || 8080, () => {
    console.log(`Server id running on the port ${process.env.PORT}`);
    connect();
})