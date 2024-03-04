const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const UserHelper = require('../helpers/userHelper');
const Middleware = require('../middleware/authMiddleware');
const { result } = require('lodash');
const uploadMedia = require('../middleware/uploadMedia');

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
};

const getProfileUser = async (req, res) => {
    try {
        const { dataToken } = req.body;

        const response = await UserHelper.profileUser({dataToken})

        return res.send({
            message: 'Get Profile User Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Profile User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const updateProfileUser = async (req, res) => {
    try {
        const { dataToken, name, contact, address, province, city } = req.body;

        const response = await UserHelper.updateProfileUser({ dataToken, name, contact, address, province, city });
        
        return res.send({
            message: 'Update Profile User Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Update Profile User API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const changeImage = async (req, res) => {
    try {
        const { dataToken } = req.body;
        const img = req.files;

        const response = await UserHelper.changeImage({ dataToken, img });

        return res.send({
            message: 'Change Image Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Change Image API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

Router.get('/list', Middleware.validateToken, listUser);
Router.patch('/admin/update/:id', Middleware.validateToken, updateUser);
Router.delete('/admin/delete/:id', Middleware.validateToken, deleteUser);
Router.get('/profile', Middleware.validateToken, getProfileUser);
Router.patch('/profile/update', Middleware.validateToken, updateProfileUser);
Router.patch('/change-image', uploadMedia.fields([{ name: 'imageUrl', maxCount: 1 }]), Middleware.validateToken,  changeImage);

module.exports = Router;