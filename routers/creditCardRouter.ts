import { Router } from "express";
import { createCreditCard, recharges } from "../controllers/creditCardController.js";
import { verifyDatasReqToRecharges, verifyRequestDatas } from "../Middlewares/verifiesMidd.js";


const creditCard = Router();

creditCard.post('/create',verifyRequestDatas, createCreditCard);

creditCard.post('/recharges', verifyDatasReqToRecharges, recharges);


export default creditCard;