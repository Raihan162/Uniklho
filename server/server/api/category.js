const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const CategoryHelper = require('../helpers/categoryHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/category.js';

const addCategory = async (req, res) => {
    try {
        const { name, dataToken } = req.body;

        const response = await CategoryHelper.addCategory({ name, dataToken })
        return res.send({
            message: 'Add Category Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Add Category API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getAllCategory = async (req, res) => {
    try {
        const response = await CategoryHelper.getAllCategory();

        return res.send({
            message: 'Get All Category Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get All Category API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToken = req.body.dataToken;

        const response = await CategoryHelper.deleteCategory({ id, dataToken });

        return res.send({
            message: 'Delete Category Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Delete Category API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dataToken } = req.body;

        const response = await CategoryHelper.updateCategory({ id, name, dataToken });

        return res.send({
            message: 'Update Category Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Update Category API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/add', Middleware.validateToken, addCategory)
Router.get('/list', getAllCategory);
Router.delete('/delete/:id', Middleware.validateToken, deleteCategory);
Router.patch('/update/:id', Middleware.validateToken, updateCategory);

module.exports = Router;