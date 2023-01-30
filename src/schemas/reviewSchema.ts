import Joi from "joi";

const reviewSchema = Joi.object({
    "description": Joi.string().required(),
    "rating": Joi.number().required()
})

export default reviewSchema;