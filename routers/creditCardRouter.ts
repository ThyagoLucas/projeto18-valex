import { Router } from "express";
import { createCreditCard } from "../controllers/creditCardController.js";
import { verifyRequestDatas } from "../Middlewares/verifiesMidd.js";


const creditCard = Router();

creditCard.post('/create',verifyRequestDatas, createCreditCard);




export default creditCard;