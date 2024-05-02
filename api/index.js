import express from "express";
import dotenv from "dotenv";
import moogose from "moogose"
dotenv.config();

const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})