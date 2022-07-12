import { Router } from 'express';
import creditCard from './creditCardRouter.js';
import paymentsRouter from './paymentsRouter.js';

const routers = Router();

routers.use(creditCard);
routers.use(paymentsRouter);

export default routers;