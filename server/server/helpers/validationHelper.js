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

const loginValidation = ({data}) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    };
};

const addProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        category_id: Joi.number().required()
    });

    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data.error));
    };
};

const updateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        contact: Joi.number().min(10),
        address: Joi.string(),
        subdistrict: Joi.string(),
        city: Joi.string(),
        province: Joi.string()
    });

    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data.error));
    };
}

module.exports = {
    registerValidation,
    loginValidation,
    addProductValidation,
    updateUser
};
