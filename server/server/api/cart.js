const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const CartHelper = require('../helpers/cartHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/cart.js';

const addToCart = async (req, res) => {
    try {
        const { dataToken, qty, product_id } = req.body;

        const response = await CartHelper.addToCart({ dataToken, qty, product_id });

        return res.send({
            message: 'Add to Cart Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Add to Cart API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataToken } = req.body;

        const response = await CartHelper.deleteCart({ id, dataToken });

        return res.send({
            message: 'Delete Cart Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Delete Cart API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getDataCart = async (req, res) => {
    try {
        const { dataToken } = req.body;

        const response = await CartHelper.getCart({ dataToken });

        return res.send({
            message: 'Get Cart Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get Cart API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/add', Middleware.validateToken, addToCart);
Router.delete('/delete/:id', Middleware.validateToken, deleteCart);
Router.get('/list', Middleware.validateToken, getDataCart);

module.exports = Router;