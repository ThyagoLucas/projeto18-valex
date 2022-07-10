import { Router } from 'express';
import creditCard from './creditCardRouter.js';

const routers = Router();

routers.use(creditCard);




export default routers;