import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());

import productAPI from "./api/feedback";
app.use("/api/v1",
    productAPI,
)

const API_PORT: number = parseInt(process.env.API_PORT) || 5011
app.listen(API_PORT, async () => {
    console.log('API running on port', API_PORT)
});