import Joi from "joi";


const validateDatasToActivateCard = Joi.object({
    userId: Joi.number().min(1).required(),
    cvc: Joi.number().min(3).max(3).required(),
    password: Joi.number().min(4).max(4).required()

});


export default validateDatasToActivateCard;