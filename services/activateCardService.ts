import dayjs from "dayjs";
import cryptr from "../cryptrConfig.js";
import { findById, update } from "../repositories/cardRepository.js";

export async function activeCard( cardId: number, cvc: number, password: number ){

    const userCard = await findById(cardId);
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