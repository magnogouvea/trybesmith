import Joi from 'joi';

const createOrderSchema = Joi.object({
  productsIds: Joi.array().min(1).items(Joi.number()).required()
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
});

export default createOrderSchema;