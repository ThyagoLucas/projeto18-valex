import { Router } from "express";
import { payments } from "../controllers/paymentsController.js";
import { checkAmount } from "../Middlewares/verifiesMidd.js";

const paymentsRouter = Router();



paymentsRouter.post('/payments', checkAmount, payments);



export default paymentsRouter;