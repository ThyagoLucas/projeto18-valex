import { allPayments } from "../repositories/paymentRepository.js";
import { allRecharges } from "../repositories/rechargeRepository.js";

export async function balance (cardId: number){

    const findRecharges = await allRecharges(cardId);
    const findPayments = await allPayments(cardId);

    if(!findRecharges) throw {type: "500", message:"without balance"};
    const balance = Number(findRecharges.totalRecharges) - (Number(findPayments.totalPayments)||0);

    return balance;

}