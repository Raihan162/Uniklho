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
            include: {
                model: db.category,
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                }
            },
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

const updateProduct = async ({ id, name, description, price, stock, category_id, img, dataToken }) => {
    try {
        const t = await sequelize.transaction()
        if (dataToken?.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'))
        };

        const checkProduct = await db.products.findOne({
            where: {
                id
            }
        });
        if (!checkProduct) {
            return Promise.reject(Boom.badRequest('Product doesn`t exist'));
        };

        if (img) {
            await cloudinaryDeleteImg(checkProduct?.image_public_id, 'image')
        };

        let imageResult = await uploadToCloudinary(img.image_url[0], 'image')

        await db.products.update({
            name: name ? name : checkProduct?.name,
            description: description ? description : checkProduct?.description,
            price: price ? price : checkProduct?.price,
            stock: stock ? stock : checkProduct?.stock,
            image_url: img ? imageResult?.url : checkProduct?.image_url,
            image_public_id: img ? imageResult?.public_id : checkProduct?.image_public_id,
            category_id: category_id ? category_id : checkProduct?.category_id
        }, {
            where: {
                id
            }
        }, { transaction: t })

        await t.commit();
        return Promise.resolve(true);
    } catch (error) {
        await t.rollback();
        console.log([fileName, 'Update Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteProduct = async ({ id, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'))
        };

        const checkProduct = await db.products.findOne({
            where: {
                id
            }
        });
        if (!checkProduct) {
            return Promise.reject(Boom.badRequest('Product doesn`t exist'))
        };

        await db.products.destroy({
            where: {
                id
            }
        });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Delete Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getDetailProduct = async ({ id }) => {
    try {
        const checkProduct = await db.products.findOne({
            include: {
                model: db.category,
                attributes: ['name']
            },
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!checkProduct) {
            return Promise.reject(Boom.badRequest('Product doesn`t exist'));
        };

        return Promise.resolve(checkProduct)
    } catch (error) {
        console.log([fileName, 'Get Detail Product Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getDetailProduct
}