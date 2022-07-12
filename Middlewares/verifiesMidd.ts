
import dayjs from "dayjs";
import { NextFunction, Request, Response, } from "express";
import { findByTypeAndEmployeeId, findById as findCardById} from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";

export async function verifyRequestDatas(req: Request, res: Response, next: NextFunction){

    //verify company
    const token = req.headers['x-api-key'] as string;
    const thereIsCompany = await findByApiKey(token);
    if(!thereIsCompany) throw { type: "500", message:"Companies dont exist" }
    
    //verify type of credit card
    const { type } = req.body;
    const types = ['groceries', 'restaurant', 'transport', 'education', 'health'];
    const isType = types.includes(type);
    if(!isType) {throw {type: "500", message:"type invalid"}}

    //verify employee in copany
    const employeeCod = req.body.employeeCod;
    const employee = await findById(employeeCod);
    if(!employee || employee.companyId != thereIsCompany.id) throw { type: "500", message:"unauthorized" }

    //verify type and employee on some card
    const thereIsCard = await findByTypeAndEmployeeId(type, employeeCod);
    if(thereIsCard) throw { type: "500", message:"card already exists" }

    next();
}

export async function verifyReqToRegisterPassword(req: Request, res: Response, next: NextFunction){

    const { userId, cardId, cvc, password }= req.body;
    const passLength = password.toString();

    const thereIsCard =  await findCardById(cardId);
    
    if(!thereIsCard || thereIsCard.employeeId != userId) throw {type: "500", message:"invalid datas"};
    if( typeof(userId) != 'number') throw {type: "500", message:"code client invalid"};
    if( typeof(cvc) != 'number' ) throw {type: "500", message:"code cvc is invalid"};
    if( typeof(password) != 'number' ) throw {type: "500", message:"invalid password type"};
    if( passLength.length != 4) throw {type: "500", message:"invalid password length"};

    next();
}

export async function verifyDatasReqToRecharges(req: Request, res: Response, next: NextFunction){

    const { cardId, amount } = req.body;
    const  token  = req.headers['x-api-key'] as string;

    // check amount and cardId type
    if(typeof(amount) != 'number') throw {type: 500, message: "invalid amount type"};
    if(amount <= 0) throw {type: 500, message: "invalid amount value"};
    if(typeof(cardId) != 'number') throw {type: 500, message: "invalid code card type"};

    // check isCard registred
    const userCard = await findCardById(cardId);
    
    if( !userCard ) throw {type: 500, message: "invalid code Card"};
    if( userCard.isBlocked ) throw {type: 500, message: "card is blocked, unlocked it"};

    // check validate card
    const validate = userCard.expirationDate.split('/');
    const monthValidate = Number (validate[0]);
    const yearValidate = Number (validate[1]);
    const month = Number (dayjs().format('MM'));
    const year = Number (dayjs().format('YY'));

    if( yearValidate <= year && monthValidate < month  ) throw {type: "500", message:"Expired card"};

    // checking if userCard is company employee
    const company = await findByApiKey(token);
    const employee = await findById(userCard.employeeId);
    if(!employee || !company || employee.companyId != company.id) throw {type: 500, message: "unauthorized"};

    next();

}

export async function checkAmount(req: Request, res: Response, next: NextFunction){

    const { amount } = req.body;

    if(!amount || typeof(amount) != 'number'|| amount <= 0){
        throw {type: 404, message: "invalid amount"}
    }

    next();
}