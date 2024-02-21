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
        const { name, contact, address, subdistrict, city, province, dataToken } = req.body;

        // Validation.updateUser({ name, contact, address, subdistrict, city, province })

        const response = await UserHelper.updateUser({ id, name, contact, address, subdistrict, city, province, dataToken });

        return res.send({
            message: 'Update User Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Update User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataToken } = req.body;

        const response = await UserHelper.deleteUser({ id, dataToken });

        return res.send({
            message: 'Delete User Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Delete User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.get('/list', Middleware.validateToken, listUser);
Router.patch('/admin/update/:id', Middleware.validateToken, updateUser);
Router.delete('/admin/delete/:id', Middleware.validateToken, deleteUser);

module.exports = Router;