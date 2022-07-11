import { Request, Response } from "express";
import { activeCard } from "../services/activateCardService.js";
import insertCard from "../services/createCardService.js";

export async function createCreditCard(req: Request, res: Response){

    const { employeeCod, type } = req.body;

    insertCard(employeeCod, type);
    
    res.sendStatus(201);
}

export async function activate( req: Request, res: Response ){

    const { cardId, cvc, password }= req.body;
    
    await activeCard( cardId, cvc, password );

    console.log("updated");

    res.sendStatus(201)
}