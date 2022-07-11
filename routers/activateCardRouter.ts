import { Router } from "express";
import { activate } from "../controllers/creditCardController.js";
import { verifyReqToRegisterPassword } from "../Middlewares/verifiesMidd.js";

const activateCard = Router();


activateCard.patch('/activate', verifyReqToRegisterPassword, activate);


export default activateCard;

