import express from 'express';
import {getMessage, saveMessage} from "../Controllers/message.controller.js";

const messageRoute = express.Router();
messageRoute.get('/', getMessage);
messageRoute.put('/', saveMessage);


export default messageRoute;