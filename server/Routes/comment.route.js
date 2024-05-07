import express from 'express';

const userRoute = express.Router();
userRoute.put('/login');

export default userRoute;
