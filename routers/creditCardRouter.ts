import { Router } from "express";
import { accountStament, activate, createCreditCard, recharges } from "../controllers/creditCardController.js";
import { verifyDatasReqToRecharges, verifyReqToRegisterPassword, verifyRequestDatas } from "../Middlewares/verifiesMidd.js";


const creditCard = Router();

creditCard.post('/create',verifyRequestDatas, createCreditCard);

creditCard.patch('/activate', verifyReqToRegisterPassword, activate);

creditCard.post('/recharges', verifyDatasReqToRecharges, recharges);

creditCard.get('/transactions', accountStament);

export default creditCard;