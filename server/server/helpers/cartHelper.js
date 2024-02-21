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

module.exports = {
    addToCart
}