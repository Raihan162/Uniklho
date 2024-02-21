const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const UserHelper = require('../helpers/userHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/user.js';

const listUser = async (req, res) => {
    try {
        const { dataToken } = req.body;

        const response = await UserHelper.getAlluser({ dataToken });

        return res.send({
            message: 'Get All User Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get All User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact, address, subdistrict, city, province } = req.body;

        // Validation.updateUser({ name, contact, address, subdistrict, city, province })

        const response = await UserHelper.updateUser({ id, name, contact, address, subdistrict, city, province });

        return res.send({
            message: 'Update User Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'Update User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/list', Middleware.validateToken, listUser);
Router.patch('/update/:id', updateUser)

module.exports = Router;