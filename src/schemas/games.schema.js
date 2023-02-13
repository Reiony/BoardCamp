import Joi from "joi";

export const gamesSchema = Joi.object({
  name: Joi.string().min(1).required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().positive().required(),
  pricePerDay: Joi.number().positive().required()
});
