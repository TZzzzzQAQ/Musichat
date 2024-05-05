import express from 'express';
import {saveData} from "../Controllers/user.controller.js";

const userRoute = express.Router();
userRoute.put('/login', saveData);

export default userRoute;
