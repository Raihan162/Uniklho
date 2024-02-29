const Boom = require('boom');
const _ = require('lodash');
require('dotenv').config();
const moment = require('moment');

const fileName = 'server/helpers/wishlistHelpers.js';

const db = require('../../models/index');
const GeneralHelper = require('./generalHelper');

const addToWishlist = async ({ dataToken, products_id }) => {
    try {
        const checkProduct = await db.products.findOne({
            where: {
                id: products_id
            }
        });
        if (!checkProduct){
            return Promise.reject(Boom.badRequest('Product doesn`t exist'))
        };

        const checkWishlist = await db.wishlist.findOne({
            where: {
                products_id: products_id
            }
        });
        if (checkWishlist){
            await db.wishlist.destroy({
                where: {
                    user_id: dataToken?.id,
                    products_id: products_id
                }
            })
            return Promise.resolve(false);
        }

        await db.wishlist.create({
            products_id,
            user_id: dataToken?.id
        });
        
        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Add to Wishlist Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteFromWishlist = async ({ id, dataToken }) => {
    try {
        await db.wishlist.destroy({
            where: {
                user_id: dataToken?.id,
                products_id: id
            }
        })
        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Delete Product From Wishlist Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getAllWishlist = async ({ dataToken }) => {
    try {
        const response = await db.wishlist.findAll({
            where: {
                user_id: dataToken?.id
            },
            include: {
                model: db.products
            }
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get All Data From Wishlist Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getWishlistbyProduct = async ({ id, dataToken }) => {
    try {
        const response = await db.wishlist.findOne({
            where: {
                user_id: dataToken?.id,
                products_id: id
            }
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get Wishlit by Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    addToWishlist,
    deleteFromWishlist,
    getAllWishlist,
    getWishlistbyProduct
}