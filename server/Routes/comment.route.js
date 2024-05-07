import express from 'express';
import {saveComment} from "../Controllers/comment.controller.js";

const commentRoute = express.Router();
commentRoute.put('/',saveComment);

export default commentRoute;
