import express,{ Request, Response, json} from "express";
import cors from 'cors';


const server = express();

server.use(cors());
server.use(json());

server.get('/', (req: Request, res: Response) => {

    console.log("entrei aqui");
    res.sendStatus(200);

});


server.listen(4000, ()=>{console.log("server is running on port 4000")});





