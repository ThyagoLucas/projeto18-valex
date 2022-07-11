import { insert, RechargeInsertData } from "../repositories/rechargeRepository.js";


export async function recharge(cardId: number, amount: number){

    const recharge = {} as RechargeInsertData;

    recharge.cardId = cardId;
    recharge.amount = amount;

    await insert(recharge);

}