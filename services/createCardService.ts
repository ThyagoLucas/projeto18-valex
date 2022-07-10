import dayjs from "dayjs";
import { Card, insert, TransactionTypes } from "../repositories/cardRepository.js";
import { faker } from '@faker-js/faker';
import { findById } from "../repositories/employeeRepository.js";
import bcrypt from 'bcrypt';



export default async function insertCard(userId: number, type: string){

    const card = {} as Card;
    const tipo = type as TransactionTypes

    // validity
    const month = Number (dayjs().format('MM'));
    const year = (Number (dayjs().format('YY')) + 5);
    const validate = month < 10 ?  `0${month}/${year}` : `${month}/${year}`

    // generating card number
    const numberCreditCard = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');

    // generating card holder name
    const userDatas = await findById(userId);
    const name = userDatas.fullName.split(' ').filter(name => name.length > 3);
    const resumedname = name.map((partname,index) => index == 0 || index == name.length - 1 ? partname = partname : partname = partname[0]).join(' ').toLocaleUpperCase();
   
    //generating CVC
    const cvc = faker.finance.creditCardCVV();
    const emcryptedcvc = bcrypt.hashSync(cvc, 10);
    console.log(cvc)
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

    insert(card);

}