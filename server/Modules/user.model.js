import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;