import express,{ json } from "express";
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import routers from "./routers/index.js";
import errorHandler from "./Middlewares/errorHandlerMiddlware.js";

dotenv.config();


const server = express();
const port: number = +process.env.PORT || 4000; 

server.use(cors());
server.use(json());
server.use(routers);
server.use(errorHandler);


server.listen(port, ()=>{console.log("server is running on port 4000")});





