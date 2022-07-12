import dayjs from "dayjs";
import { findById as findCardById} from "../repositories/cardRepository.js";
import cryptr from "../cryptrConfig.js";
import { findById as findBusinessById} from "../repositories/businessRepository.js";
import {insert, PaymentInsertData } from "../repositories/paymentRepository.js";
import { balance, isExpirade } from "../utils/cardUtils.js";

export async function payment (cardId: number, password: number, bussinessCod: number, amount: number){
    
    // check isCard registred
    const userCard = await findCardById(cardId);
    if(!userCard) throw {type: 403 , message:"card dont exist"};

    // check if card is blocked
    if(userCard.isBlocked) throw {type: 401, message: "card is blocked"};

    // check password
    const decryptedPassword = Number (cryptr.decrypt(userCard.password));
    if(password != decryptedPassword) throw {type: 401, message:"invalid password"};

    // check card limit
    const nowBalance = await balance(cardId);
    if(nowBalance < amount) throw {type: 401, message:"without balance"};

    // verify business
    const bussiness = await findBusinessById(bussinessCod);
    if(!bussiness) throw {type: 401, message:"bussiness dont registred"};

    // check validate
    await isExpirade(userCard.expirationDate);

    // check type card and type bussiness
    if(userCard.type != bussiness.type) throw {type: 401, message:"purchase not allowed at this bussiness"};

    // insert payment
    const payment = {} as PaymentInsertData;

    payment.cardId = cardId;
    payment.amount = amount;
    payment.businessId = bussinessCod;

    await insert(payment);

}