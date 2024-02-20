const Joi = require('joi');
const Boom = require('boom');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        contact: Joi.number().required().min(10),
        address: Joi.string().required(),
        subdistrict: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required()
    });

    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    };
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    };
}

module.exports = {
    registerValidation,
    loginValidation
};
