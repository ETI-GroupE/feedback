import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());

import productAPI from "./api/feedback";
import verifyAuth from './middleware/verifyAuth';
// if (process.env.K_SERVICE) {
//     app.use(verifyAuth);
// }
app.use("/api/v1",
    productAPI,
)

const API_PORT: number = parseInt(process.env.API_PORT) || 5011
app.listen(API_PORT, async () => {
    console.log('API running on port', API_PORT)
});