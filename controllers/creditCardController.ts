import { Request, Response } from "express";

export async function createCreditCard(req: Request, res: Response){

    console.log('im here in create CC');

    res.sendStatus(201);

}