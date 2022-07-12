import { Request, Response } from "express";
import { payment } from "../services/paymentsService.js";

export async function payments( req: Request, res: Response){

    const {cardId, password, bussinessCod, amount} = req.body;

    await payment(cardId, password, bussinessCod, amount);


    res.status(201).send('approved');
}   