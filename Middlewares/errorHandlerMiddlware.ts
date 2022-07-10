import { Request, Response, NextFunction } from 'express';


export default function errorHandler (error, req: Request, res: Response, next: NextFunction){
    
    console.log('errosood:', error);
    if(error) {
        return res.sendStatus(500);
    }
   

}