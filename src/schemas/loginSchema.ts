import Joi from "joi"

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
})

export default loginSchema;