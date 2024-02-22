const Boom = require('boom');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
require('dotenv').config();

const fileName = 'server/helpers/cartHelpers.js';

const db = require('../../models/index');
const GeneralHelper = require('../helpers/generalHelper');

const addToCart = async ({ dataToken, qty, product_id }) => {
    try {
        const checkStock = await db.products.findOne({
            where: {
                id: product_id
            }
        });

        if (checkStock?.stock === 0) {
            return Promise.reject(Boom.badRequest('Product out of stock'));
        };

        if (qty > checkStock?.stock) {
            return Promise.reject(Boom.badRequest('Limited stock product'));
        };

        const checkData = await db.cart.findOne({
            where: {
                product_id,
                user_id: dataToken?.id
            }
        });

        if (!checkData) {
            await db.cart.create({
                user_id: dataToken?.id,
                product_id,
                qty: qty
            })
        } else {
            await db.cart.update({
                qty: checkData.qty + qty
            }, {
                where: {
                    product_id,
                }
            })
        };

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Add to Cart Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteCart = async ({ id, dataToken }) => {
    try {
        const checkCart = await db.cart.findOne({
            where: {
                id
            }
        });
        if (!checkCart) {
            return Promise.reject(Boom.badRequest('Cart doesn`t exist'));
        };

        await db.cart.destroy({
            where: {
                id
            }
        });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Delete Cart Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCart = async ({ dataToken }) => {
    try {
        const response = await db.cart.findAll({
            where: {
                user_id: dataToken?.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.products,
                    include: {
                        model: db.category,
                        attributes: {
                            exclude: ['id', 'createdAt', 'updatedAt']
                        }
                    },
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: db.users,
                    attributes: {
                        exclude: ['id', 'password', 'createdAt', 'updatedAt']
                    }
                }
            ]
        })

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get Cart Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    addToCart,
    deleteCart,
    getCart
}