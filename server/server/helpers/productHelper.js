const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
require('dotenv').config();
const moment = require('moment');

const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");
const fileName = 'server/helpers/productHelpers.js';

const db = require('../../models/index');
const GeneralHelper = require('./generalHelper');

const addProduct = async ({ dataToken, name, description, price, stock, category_id, img }) => {
    try {
        const t = await sequelize.transaction()
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'))
        };

        let imageResult = await uploadToCloudinary(img.image_url[0], 'image')

        await db.products.create({
            name,
            description,
            price,
            stock,
            image_url: imageResult?.url,
            image_public_id: imageResult?.public_id,
            category_id
        }, { transaction: t });

        await t.commit();
        return Promise.resolve(true);
    } catch (error) {
        await t.rollback();
        console.log([fileName, 'Add Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getAllProduct = async () => {
    try {
        const response = await db.products.findAll({
            include: { model: db.category },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get All Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateProduct = async () => {
    try {

    } catch (error) {
        console.log([fileName, 'Update Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteProduct = async () => {
    try {

    } catch (error) {
        console.log([fileName, 'Delete Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

// START WISHLIST
const addToWishlist = () => {
    try {

    } catch (error) {
        console.log([fileName, 'Add to Wishlist Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteFromWishlist = async () => {
    try {

    } catch (error) {
        console.log([fileName, 'Delete Product From Wishlist Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};
// END WISHLIST

// START CATEGORY
const addCategory = async () => {
    try {

    } catch (error) {
        console.log([fileName, 'Add Category Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    deleteFromWishlist,
    addCategory
}