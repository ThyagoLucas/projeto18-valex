import { findByCardId as findRechages, insert, RechargeInsertData } from "../repositories/rechargeRepository.js";
import dayjs from "dayjs";
import cryptr from "../cryptrConfig.js";
import { findById as findCardById, update } from "../repositories/cardRepository.js";
import { Card, insert as insertCardDB, TransactionTypes } from "../repositories/cardRepository.js";
import { faker } from '@faker-js/faker';
import { findById as findEmployeeById} from "../repositories/employeeRepository.js";
import { balance } from "../utils/cardUtils.js";
import { findByCardId as findPayments } from "../repositories/paymentRepository.js";


export async function insertCard(userId: number, type: string){

    const card = {} as Card;
    const tipo = type as TransactionTypes

    // validity
    const month = Number (dayjs().format('MM'));
    const year = (Number (dayjs().format('YY')) + 5);
    const validate = month < 10 ?  `0${month}/${year}` : `${month}/${year}`

    // generating card number
    const numberCreditCard = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');

    // generating card holder name
    const userDatas = await findEmployeeById(userId);
    const name = userDatas.fullName.split(' ').filter(name => name.length > 3);
    const resumedname = name.map((partname,index) => index == 0 || index == name.length - 1 ? partname = partname : partname = partname[0]).join(' ').toLocaleUpperCase();
   
    //generating CVC
    const cvc = faker.finance.creditCardCVV();
    // encrypting
    const emcryptedcvc = cryptr.encrypt(`${cvc}`);

    console.log(cvc) //delete if you dont want see the cvc in console
    card.employeeId = userId;
    card.number = numberCreditCard;
    card.cardholderName = resumedname;
    card.securityCode = emcryptedcvc;
    card.expirationDate = validate;
    card.password = null;
    card.isVirtual = false;
    card.originalCardId = null;
    card.isBlocked = true;
    card.type = tipo;

    insertCardDB(card);

}

export async function activeCard( cardId: number, cvc: number, password: number ){

    const userCard = await findCardById(cardId);
    const cardCVC = Number (cryptr.decrypt(userCard.securityCode));
    if( cvc != cardCVC ) throw {type: "500", messege:"invalid CVC"};
    if( !userCard.isBlocked && userCard.password != null) throw {type: "500", messege:"Password already registered"};

    // verify validate
    const validate = userCard.expirationDate.split('/');
    const monthValidate = Number (validate[0]);
    const yearValidate = Number (validate[1]);
    const month = Number (dayjs().format('MM'));
    const year = Number (dayjs().format('YY'));
  
    if( yearValidate <= year && monthValidate < month  ) throw {type: "500", messege:"Expired card"};

    const encryptedPassword = cryptr.encrypt(password);

    userCard.password = encryptedPassword;
    userCard.isBlocked = false;

    await update(cardId, userCard);

}

export async function recharge(cardId: number, amount: number){

    const recharge = {} as RechargeInsertData;

    recharge.cardId = cardId;
    recharge.amount = amount;

    await insert(recharge);

}

export async function transactions(cardId: number){

    // check if there is card 
    if(typeof(cardId) != 'number') throw {type:400, message:"invalid card type"}

    const userCard = await findCardById(cardId);

    if(!userCard) throw {type:404, message:"card does not exist"}

    // generating resume
    const balanceAvailable = await balance(cardId);
    const resume = {balance:balanceAvailable, transactions:[], recharges:[] };

    const transactions = await findPayments(cardId);
    const recharges = await findRechages(cardId);

    resume.transactions = transactions; 
    resume.recharges = recharges;

    return resume;

}

