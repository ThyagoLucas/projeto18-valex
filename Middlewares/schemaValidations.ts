import { Request, Response, NextFunction } from "express"
import Joi from "joi";

export async function schemaValidations(schema: Joi.ObjectSchema){

    return(req: Request, res: Response, next: NextFunction)=> {
        const validation = schema.validate(req.body, {abortEarly: false});
        const {error} = validation;

        if (error) throw error.details.map(detail => detail.message);
        else next();
    }
}

