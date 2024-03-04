const Boom = require('boom');
const _ = require('lodash');
require('dotenv').config();

const fileName = 'server/helpers/rajaongkirHelper.js';

const {getKey, setKey } = require('../services/redis');
const GeneralHelper = require('../helpers/generalHelper');
const { default: axios } = require('axios');

const getProvince = async () => {
    try {
        const dataProvinceRedis = await getKey({ key: "province" })

        if (dataProvinceRedis) {
            return Promise.resolve(JSON.parse(dataProvinceRedis));
        } else {
            const response = await axios.get(`${process.env.RAJAONGKIR_URL}/province`, {
                headers: {
                    "key": process.env.RAJAONGKIR_APIKEY
                }
            });
            await setKey({ key:"province", value:JSON.stringify(response?.data?.rajaongkir?.results) });

            return Promise.resolve(response?.data?.rajaongkir?.results);
        };
        
    } catch (error) {
        console.log([fileName, 'Get Province Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getCity = async ({province_id}) => {
    try {
        const response = await axios.get(`${process.env.RAJAONGKIR_URL}/city?province=${province_id}`, {
            headers: {
                "key": process.env.RAJAONGKIR_APIKEY
            }
        });

        return Promise.resolve(response?.data?.rajaongkir?.results);
    } catch (error) {
        console.log([fileName, 'Get City Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getOngkir = async ({destination,courier}) => {
    try {
        const response = await axios.post(`${process.env.RAJAONGKIR_URL}/cost`,{
            origin:'152',
            destination: destination,
            weight: 2000,
            courier: courier
        }, {
            headers: {
                key: process.env.RAJAONGKIR_APIKEY,
                'content-type': 'application/x-www-form-urlencoded'
            }
        });

        return Promise.resolve(response?.data?.rajaongkir?.results[0]?.costs);
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