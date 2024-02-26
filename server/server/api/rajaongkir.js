const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const RajaOngkirHelper = require('../helpers/rajaongkirHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/rajaongkir.js';

const getProvince = async (req, res) => {
    try {
        const { key } = req.headers;
        const response = await RajaOngkirHelper.getProvince({ key });
        return res.send({
            message: 'Get Province Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Province API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/province', getProvince);

module.exports = Router;