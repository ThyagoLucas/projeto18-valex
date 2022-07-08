import express,{ Request, Response, json} from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const server = express();
const port: number = +process.env.PORT || 4000; 

server.use(cors());
server.use(json());

server.get('/', (req: Request, res: Response) => {

    console.log("entrei aqui");
    res.sendStatus(200);

});


server.listen(port, ()=>{console.log("server is running on port 4000")});





