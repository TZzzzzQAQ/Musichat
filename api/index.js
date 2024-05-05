import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import musicRoutes from './Routes/assistant.route.js';
import userRoute from "./Routes/user.route.js"; // 确保路径正确
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch(err => {
    console.log(err);
});
const errorHandlerMiddleWare = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        statusCode,
        success: false
    });
}
const app = express();
app.use(errorHandlerMiddleWare)
app.use(express.json());
app.use(cors());
app.use('/recommend-music', musicRoutes); // 挂载路由
app.use('/user', userRoute)
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
