
import { NextFunction, Request, Response, } from "express";
import { findByTypeAndEmployeeId } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";

export async function verifyRequestDatas(req: Request, res: Response, next: NextFunction){

    //verify company
    const token = req.headers['x-api-key'] as string;
    const thereIsCompany = await findByApiKey(token);
    if(!thereIsCompany) throw { type: "500", messege:"Companies dont exist" }
    
    //verify type of credit card
    const { type } = req.body;
    const types = ['groceries', 'restaurant', 'transport', 'education', 'health'];
    const isType = types.includes(type);
    if(!isType) {throw {type: "500", messege:"type invalid"}}

    //verify employee in copany
    const employeeCod = req.body.employeeCod;
    const employee = await findById(employeeCod);
    if(!employee || employee.companyId != thereIsCompany.id) throw { type: "500", messege:"unauthorized" }

    //verify type and employee on some card
    const thereIsCard = await findByTypeAndEmployeeId(type, employeeCod);
    if(thereIsCard) throw { type: "500", messege:"card already exists" }

    next();
}

