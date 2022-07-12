import { Router } from "express";
import { accountStament, activate, block, createCreditCard, recharges, unblock } from "../controllers/creditCardController.js";
import { verifyDatasReqToRecharges, verifyReqToRegisterPassword, verifyRequestDatas } from "../Middlewares/verifiesMidd.js";


const creditCard = Router();

creditCard.post('/create',verifyRequestDatas, createCreditCard);

creditCard.patch('/activate', verifyReqToRegisterPassword, activate);

creditCard.post('/recharges', verifyDatasReqToRecharges, recharges);

creditCard.get('/transactions', accountStament);

creditCard.post('/block', block);

creditCard.post('/unblock', unblock);

export default creditCard;