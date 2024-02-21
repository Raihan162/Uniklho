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

const getAlluser = async ({ dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'))
        };

        const response = await db.users.findAll({
            where: {
                role_id: 2
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get All User Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateUser = async ({ id, name, contact, address, subdistrict, city, province, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'))
        };

        const checkUser = await db.users.findOne({
            where: {
                id
            }
        });
        if (!checkUser) {
            return Promise.reject(Boom.badRequest('User doesn`t exist'));
        };

        await db.users.update({
            name: name ? name : checkUser?.name,
            contact: contact ? contact : checkUser?.contact,
            address: address ? address : checkUser?.address,
            subdistrict: subdistrict ? subdistrict : checkUser?.subdistrict,
            city: city ? city : checkUser?.city,
            province: province ? province : checkUser?.province
        }, {
            where: {
                id
            }
        })

        return Promise.resolve(true)
    } catch (error) {
        console.log([fileName, 'Update User Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteUser = async ({ id, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'));
        };

        const checkUser = await db.users.findOne({
            where: {
                id
            }
        })
        if (!checkUser) {
            return Promise.reject(Boom.badRequest('User doesn`t exist'));
        }

        await db.users.destroy({
            where: {
                id
            }
        });

        return Promise.resolve(true)
    } catch (error) {
        console.log([fileName, 'Delete User Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getAlluser,
    updateUser,
    deleteUser
}