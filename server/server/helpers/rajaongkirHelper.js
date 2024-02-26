const Boom = require('boom');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
require('dotenv').config();

const fileName = 'server/helpers/cartHelpers.js';

const GeneralHelper = require('../helpers/generalHelper');

const getProvince = async () => {
    try {

        return Promise.resolve(true);
    } catch (error) {
        console.log([fileName, 'Get Province Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getProvince
}