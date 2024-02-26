const Boom = require('boom');
const _ = require('lodash');
require('dotenv').config();

const fileName = 'server/helpers/cartHelpers.js';

const GeneralHelper = require('../helpers/generalHelper');
const { default: axios } = require('axios');

const getProvince = async ({ key }) => {
    try {
        const response = await axios.get(`${process.env.RAJAONGKIR_URL}/province`, {
            headers: {
                "key": key
            }
        })
        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get Province Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCity = async () => {
    try {
        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get City Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getOngkir = async () => {
    try {
        return Promise.resolve(response);
    } catch (error) {
        console.log([fileName, 'Get Ongkir Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    getProvince,
    getCity,
    getOngkir
}