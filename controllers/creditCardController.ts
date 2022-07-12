import { Request, Response } from "express";
import { activeCard, blockCard, insertCard, recharge, transactions, unblockedCard } from "../services/creditCardService.js";

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

export async function recharges(req: Request, res: Response){

    const { cardId, amount } = req.body;
   
    await recharge(cardId, amount);


    console.log("recharged");
    res.sendStatus(201);
}

export async function accountStament(req: Request, res: Response){

    const { cardId } = req.body;

    const resume = await transactions(cardId);

    res.status(200).send(resume);
}

export async function block(req: Request, res: Response){

    const { cardId, password } = req.body;

    await blockCard(cardId, password);

    res.send('vencemos familia').status(201);


}

export async function unblock(req: Request, res: Response){

    const { cardId, password } = req.body;

    await unblockedCard(cardId, password);
    
    res.send("vencemos de novo").status(201);

}
