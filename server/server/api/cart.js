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

Router.post('/add', Middleware.validateToken, addToCart);

module.exports = Router;