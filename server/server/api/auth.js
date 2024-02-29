const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const AuthHelper = require('../helpers/authHelper');
const { decryptTextPayload } = require('../utils/decryptHelper');

const fileName = 'server/api/auth.js';

const register = async (req, res) => {
    try {
        const data = req.body;

        const name = decryptTextPayload(data?.name);
        const email = decryptTextPayload(data?.email);
        const contact = decryptTextPayload(data?.contact);
        const password = decryptTextPayload(data?.password);
        const address = decryptTextPayload(data?.address);
        const subdistrict = decryptTextPayload(data?.subdistrict);
        const city = decryptTextPayload(data?.city);
        const province = decryptTextPayload(data?.province);
        console.log({ name, email, password, contact, address, subdistrict, city, province })

        Validation.registerValidation({ name, email, password, contact, address, subdistrict, city, province });

        const response = await AuthHelper.register({ name, email, password, contact, address, subdistrict, city, province });

        return res.send({
            message: 'Register Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Register API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;

        const email = decryptTextPayload(data?.email);
        const password = decryptTextPayload(data?.password);

        Validation.loginValidation({ email, password });

        const response = await AuthHelper.login({ email, password });

        return res.send({
            message: 'Login Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Login API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/register', register);
Router.post('/login', login);

module.exports = Router;