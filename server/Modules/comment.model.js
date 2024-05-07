import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now,
        required: true
    },
    songID:{
        type: String,
        required:true
    }
});

const SongComment = mongoose.model("SongComment", CommentSchema);
export default SongComment;