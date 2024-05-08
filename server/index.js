import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import musicRoutes from './Routes/assistant.route.js';
import userRoute from "./Routes/user.route.js";
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import {errorHandlerMiddleWare} from "./middleware/errorHandler.middleware.js";
import Message from "./Modules/message.model.js";
import commentRoute from './Routes/comment.route.js';
import messageRoute from './Routes/message.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch(err => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors());

app.use('/recommend-music', musicRoutes);
app.use('/user', userRoute)
app.use('/comment', commentRoute)
app.use('/message', messageRoute)

app.use(errorHandlerMiddleWare)

const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('sendMessage', async (msg) => {
        try {
            const messageData = JSON.parse(msg);
            const message = new Message({
                display_name: messageData.display_name,
                message: messageData.message,
                id:messageData.id,
                time:messageData.time
            });
            await message.save();
            console.log('Message saved:', message);
            socket.broadcast.emit('receiveMessage', msg);
            socket.emit('receiveMessage', msg);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });


});
const PORT=process.env.PORT;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
