import { Request, Response } from "express";
import insertCard from "../services/createCardService.js";

export async function createCreditCard(req: Request, res: Response){

    const { employeeCod, type } = req.body;

    insertCard(employeeCod, type);
    
    res.sendStatus(201);
}

export async function activate( req: Request, res: Response ){
    
    console.log('funfei aqui');

    res.sendStatus(201)
}