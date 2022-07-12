import dayjs from "dayjs";
import { allPayments } from "../repositories/paymentRepository.js";
import { allRecharges } from "../repositories/rechargeRepository.js";

export async function balance (cardId: number){

    const findRecharges = await allRecharges(cardId);
    const findPayments = await allPayments(cardId);

    if(!findRecharges) throw {type: "500", message:"without balance"};
    const balance = Number(findRecharges.totalRecharges) - (Number(findPayments.totalPayments)||0);

    return balance;

}

export function isExpirade (expirationDate: string){

    
     // verify validate
     const validate = expirationDate.split('/');
     const monthValidate = Number (validate[0]);
     const yearValidate = Number (validate[1]);
     const month = Number (dayjs().format('MM'));
     const year = Number (dayjs().format('YY'));

     if( yearValidate <= year && monthValidate < month || yearValidate < year ) throw {type: 401, message:"Expired card"};
 

}