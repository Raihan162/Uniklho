const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const AuthHelper = require('../helpers/authHelper');

const fileName = 'server/api/auth.js';

const register = async (req, res) => {
    try {
        const { name, email, password, contact, address, subdistrict, city, province } = req.body;

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
        const { email, password } = req.body;

        Validation.loginValidation(req.body);

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