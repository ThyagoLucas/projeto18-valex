import { Request, Response, NextFunction } from 'express';


export default function errorHandler (error, req: Request, res: Response, next: NextFunction){
    
    console.log('error:', error);
    if(error) {
        return res.status(404).send(error.message);
    }
   

}
