import Joi from "joi";

const animeSchema = Joi.object({
    "name": Joi.string().required(),
    "image": Joi.string().uri().required()
})

export default animeSchema;