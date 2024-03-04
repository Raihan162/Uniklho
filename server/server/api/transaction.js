const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const TransactionHelper = require('../helpers/transactionHelper');
const Middleware = require('../middleware/authMiddleware');
const {decryptTextPayload} = require('../utils/decryptHelper');

const fileName = 'server/api/transaction.js';

const createTransaction = async (req, res) => {
    try {
        const dataToken = req.body.dataToken;

        const data = req.body;
        const name = decryptTextPayload(data?.name);
        const contact = decryptTextPayload(data?.contact);
        const address = decryptTextPayload(data?.address);
        const province = decryptTextPayload(data?.province);
        const city = decryptTextPayload(data?.city);
        const courier = decryptTextPayload(data?.courier);
        const service = decryptTextPayload(data?.service);
        const cost = decryptTextPayload(data?.cost);
        const cart = JSON.parse(decryptTextPayload(data?.cart));

        const response = await TransactionHelper.createTransaction({ name, contact, address, province, city, courier, service, cost, cart, dataToken })
        console.log(response, 'API TRANSACTION ')

        return res.send({
            message: 'Create Transaction Success',
            response: response
        });
    } catch (error) {
        console.log([fileName, 'Create Transaction API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const updatePayment = async(req, res) => {
    try {
        console.log(req.body, '<<<REQ BODY')
        const {payment_type, gross_amount, transaction_status, transaction_id, dataToken} = req.body;

        const response = await TransactionHelper.updatePayment({payment_type, gross_amount, transaction_status, transaction_id, dataToken});

        return res.send({
            message: 'Update Payment Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Create Transaction API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getTransaction = async(req, res) => {
    try {
        const { dataToken } = req.body;

        const response = await TransactionHelper.getTransaction({dataToken});

        return res.send({
            message: 'Get Transaction Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Transaction API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/create', Middleware.validateToken, createTransaction);
Router.patch('/payment/update', Middleware.validateToken, updatePayment);
Router.get('/list', Middleware.validateToken, getTransaction);

module.exports = Router;