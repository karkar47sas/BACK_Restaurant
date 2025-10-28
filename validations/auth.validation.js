const Joi=require("joi");

function validateLoginUser(obj){
    const schema=Joi.object({
        email:Joi.string().trim().min(5).max(100).required(),
        password:Joi.string().trim().min(6).required()
    })
    return schema.validate(obj);
}

function validateRegisterUser(obj){
    const schema=Joi.object({
        username:Joi.string().trim(),
        email:Joi.string().trim().min(5).max(100).required(),
        numCDI:Joi.string().trim().min(5).max(100).required(),
        typeUser:Joi.string().valid("Administrateur","Cuisinier","Client"),
        password:Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}

module.exports={validateLoginUser,validateRegisterUser};