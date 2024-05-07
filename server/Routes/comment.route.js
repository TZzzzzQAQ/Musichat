import express from 'express';
import { getCommentsBySongID, saveComment, deleteComment } from "../Controllers/comment.controller.js";

const commentRoute = express.Router();

// 定义获取评论的路由，注意使用查询字符串
commentRoute.get('/comments', getCommentsBySongID);
// 定义保存评论的路由
commentRoute.post('/comments', saveComment);
// 定义删除评论的路由
commentRoute.delete('/comments/:id', deleteComment);

export default commentRoute;
