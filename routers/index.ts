import { Router } from 'express';
import activateCard from './activateCardRouter.js';
import creditCard from './creditCardRouter.js';

const routers = Router();

routers.use(creditCard);
routers.use(activateCard);

export default routers;