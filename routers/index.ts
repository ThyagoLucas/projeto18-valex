import { Router } from 'express';
import activateCard from './activateCardRouter.js';
import creditCard from './creditCardRouter.js';
import paymentsRouter from './paymentsRouter.js';

const routers = Router();

routers.use(creditCard);
routers.use(activateCard);
routers.use(paymentsRouter);

export default routers;