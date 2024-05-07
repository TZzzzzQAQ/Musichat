import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    display_name: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    time:{
        type: Date,
        required: true
    },
    songID:{
        type:String,
        required:true
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;