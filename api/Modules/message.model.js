import mongoose from "mongoose";
import {Timestamp} from "mongodb";

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    time:{
        type: Date,
        required: true
    }
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;