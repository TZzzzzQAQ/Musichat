import express from 'express';
import cors from 'cors';
import musicRoutes from './Routes/assistant.route.js'; // 确保路径正确
//import moogose from "moogose"
import dotenv from "dotenv"

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/recommend-music', musicRoutes); // 挂载路由

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
