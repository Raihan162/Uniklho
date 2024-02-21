const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const ProductHelper = require('../helpers/productHelper');
const Middleware = require('../middleware/authMiddleware');
const uploadMedia = require('../middleware/uploadMedia');

const fileName = 'server/api/admin.js';

const addProduct = async (req, res) => {
    try {
        const { dataToken, data } = req.body;
        const img = req.files;

        const { name, description, price, stock, category_id } = JSON.parse(data)

        Validation.addProductValidation({ name, description, price, stock, category_id })

        const response = await ProductHelper.addProduct({ dataToken, name, description, price, stock, category_id, img })

        return res.send({
            message: 'Add Product Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Add Product API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getAllProduct = async (req, res) => {
    try {
        const response = await ProductHelper.getAllProduct();
        return res.send({
            message: 'Get All Product Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get All Product API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/add', uploadMedia.fields([{ name: 'image_url', maxCount: 1 }]), Middleware.validateToken, addProduct);
Router.get('/list', getAllProduct);

module.exports = Router;