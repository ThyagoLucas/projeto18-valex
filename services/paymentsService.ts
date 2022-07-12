import dayjs from "dayjs";
import { findById as findCardById} from "../repositories/cardRepository.js";
import cryptr from "../cryptrConfig.js";
import { findById as findBusinessById} from "../repositories/businessRepository.js";
import { allRecharges } from "../repositories/rechargeRepository.js";
import { allPayments, insert, PaymentInsertData } from "../repositories/paymentRepository.js";


export async function payment (cardId: number, password: number, bussinessCod: number, amount: number){
    
    // check isCard registred
    const userCard = await findCardById(cardId);
    if(!userCard) throw {type: "500", message:"card dont exist"};

    // check password
    const decryptedPassword = Number (cryptr.decrypt(userCard.password));
    if(password != decryptedPassword) throw {type: "500", message:"invalid password"};

    // check card limit
    const findRecharges = await allRecharges(cardId);
    const findPayments = await allPayments(cardId);

    if(!findRecharges) throw {type: "500", message:"without balance"};
    const balance = Number(findRecharges.totalRecharges) - (Number(findPayments.totalPayments)||0);
    if(balance < amount) throw {type: "500", message:"without balance"};

    console.log(balance)
    // verify business
    const bussiness = await findBusinessById(bussinessCod);
    if(!bussiness) throw {type: "500", message:"bussiness dont registred"};

    // check if card is blocked
    if(userCard.isBlocked) throw {type: "500", message: "card is blocked"};

    // check validate
    const validate = userCard.expirationDate.split('/');
    const monthValidate = Number (validate[0]);
    const yearValidate = Number (validate[1]);
    const month = Number (dayjs().format('MM'));
    const year = Number (dayjs().format('YY'));

    if( yearValidate <= year && monthValidate < month  ) throw {type: "500", message:"Expired card"};

    // check type card and type bussiness
    if(userCard.type != bussiness.type) throw {type: "500", message:"purchase not allowed at this bussiness"};

    // insert payment
    const payment = {} as PaymentInsertData;

    payment.cardId = cardId;
    payment.amount = amount;
    payment.businessId = bussinessCod;

    await insert(payment);


}