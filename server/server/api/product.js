const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const ProductHelper = require('../helpers/productHelper');
const Middleware = require('../middleware/authMiddleware');
const uploadMedia = require('../middleware/uploadMedia');

const fileName = 'server/api/product.js';

const addProduct = async (req, res) => {
    try {
        const { dataToken, data } = req.body;
        const img = req.files;
        console.log(data, '<<<<DATA');
        console.log(img, '<<<<< IMG')

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
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataToken } = req.body;

        const response = await ProductHelper.deleteProduct({ id, dataToken });

        return res.send({
            message: 'Delete Product Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'Delete Product API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataToken, data } = req.body;
        const img = req.files;
        console.log(data, '<<<<<ID')
        const { name, description, price, stock, category_id } = JSON.parse(data)


        const response = await ProductHelper.updateProduct({ id, name, description, price, stock, category_id, img, dataToken });
        return res.send({
            message: 'Update Product Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'Update Product API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/admin/add', uploadMedia.fields([{ name: 'image_url', maxCount: 1 }]), Middleware.validateToken, addProduct);
Router.get('/list', getAllProduct);
Router.delete('/admin/delete/:id', Middleware.validateToken, deleteProduct);
Router.patch('/admin/update/:id', uploadMedia.fields([{ name: 'image_url', maxCount: 1 }]), Middleware.validateToken, updateProduct);

module.exports = Router;