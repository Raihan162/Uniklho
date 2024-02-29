const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const RajaOngkirHelper = require('../helpers/rajaongkirHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/rajaongkir.js';

const getProvince = async (req, res) => {
    try {
        const response = await RajaOngkirHelper.getProvince();
        return res.send({
            message: 'Get Province Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Province API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getCity  = async(req,res)=>{
    try {
        const {province_id} = req.query;

        const response = await RajaOngkirHelper.getCity({province_id});
        return res.send({
            message: 'Get City Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get City API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getOngkir = async(req,res) => {
    try {

        const {destination,courier} = req.query;

        const response = await RajaOngkirHelper.getOngkir({destination,courier});
        return res.send({
            message: 'Get Ongkir Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Ongkir API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/province', getProvince);
Router.get('/city', getCity);
Router.post('/cost', getOngkir);

module.exports = Router;