import express from 'express';
import {getCommentsBySongID, saveComment} from "../Controllers/comment.controller.js";

const commentRoute = express.Router();
commentRoute.put('/', saveComment);
commentRoute.get('/', getCommentsBySongID);

export default commentRoute;
