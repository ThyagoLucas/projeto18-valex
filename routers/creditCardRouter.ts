import { Router } from "express";
import { activate, createCreditCard, recharges, transactions } from "../controllers/creditCardController.js";
import { verifyDatasReqToRecharges, verifyReqToRegisterPassword, verifyRequestDatas } from "../Middlewares/verifiesMidd.js";


const creditCard = Router();

creditCard.post('/create',verifyRequestDatas, createCreditCard);

creditCard.patch('/activate', verifyReqToRegisterPassword, activate);

creditCard.post('/recharges', verifyDatasReqToRecharges, recharges);

creditCard.get('/transactions', transactions);

export default creditCard;