const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
require('dotenv').config();
const moment = require('moment');

const fileName = 'server/helpers/categoryHelpers.js';

const db = require('../../models/index');
const GeneralHelper = require('./generalHelper');

const addCategory = async ({ name, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'));
        };

        const checkCategory = await db.category.findOne({
            where: {
                name
            }
        });

        if (checkCategory) {
            return Promise.reject(Boom.badRequest('Category name already exist'));
        }

        await db.category.create({
            name
        });

        return Promise.resolve(true)
    } catch (error) {
        console.log([fileName, 'Add Category Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getAllCategory = async () => {
    try {
        const response = await db.category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get All Category Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const deleteCategory = async ({ id, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'));
        };

        const checkCategory = await db.category.findOne({
            where: {
                id
            }
        });

        if (!checkCategory) {
            return Promise.reject(Boom.badRequest('ID category doesn`t exist'));
        };

        await db.category.destroy({
            where: {
                id
            }
        });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Delete Category Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updateCategory = async ({ id, name, dataToken }) => {
    try {
        if (dataToken.role_id !== 1) {
            return Promise.reject(Boom.unauthorized('You are not authorized'));
        };

        const checkCategory = await db.category.findOne({
            where: {
                id
            }
        });

        if (!checkCategory) {
            return Promise.reject(Boom.badRequest('ID category doesn`t exist'));
        };

        const checkName = await db.category.findOne({
            where: {
                name
            }
        });

        if (checkName) {
            return Promise.reject(Boom.badRequest('Category name already exist'));
        };

        await db.category.update({
            name,
        }, {
            where: {
                id
            }
        });

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Update Category Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    addCategory,
    getAllCategory,
    deleteCategory,
    updateCategory
}