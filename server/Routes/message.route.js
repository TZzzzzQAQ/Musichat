import express from 'express';
import { getMessage, saveMessage} from "../Controllers/comment.controller.js";

const messageRoute = express.Router();

// 定义获取评论的路由，注意使用查询字符串
messageRoute.get('/', getMessage);
// 定义保存评论的路由
messageRoute.put('/', saveMessage);




export default messageRoute;