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

module.exports = {
    getAlluser
}