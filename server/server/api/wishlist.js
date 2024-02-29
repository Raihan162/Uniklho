const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const WishlistHelper = require('../helpers/wishlistHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/wishlist.js';

const addWishlist = async (req, res) => {
    try {
        const { dataToken, products_id } = req.body;

        const response = await WishlistHelper.addToWishlist({ dataToken, products_id });

        return res.send({
            message: 'Add Wishlist Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Add Wishlist API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getAllWishlist = async (req, res) => {
    try {
        const { dataToken } = req.body;

        const response = await WishlistHelper.getAllWishlist({ dataToken });

        return res.send({
            message: 'Get All Wishlist Success',
            response
        });
    } catch (error) {
        console.log([fileName, 'Get All Wishlist API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataToken } = req.body;

        const response = await WishlistHelper.deleteFromWishlist({ id, dataToken });

        return res.send({
            message: 'Delete Wishlist Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'Delete Wishlist API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
};

const getWishlistbyProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { dataToken } = req.body;

        const response = await WishlistHelper.getWishlistbyProduct({ id, dataToken });
        
        return res.send({
            message: 'Get Wishlist by Product Success',
            response
        })
    } catch (error) {
        console.log([fileName, 'Get Wishlist by Product API', 'ERROR'], { info: `${error}` });
        return res.send(GeneralHelper.errorResponse(error));
    }
}

Router.post('/add', Middleware.validateToken, addWishlist);
Router.get('/list', Middleware.validateToken, getAllWishlist);
Router.delete('/delete/:id', Middleware.validateToken, deleteWishlist);
Router.get('/list/:id', Middleware.validateToken, getWishlistbyProduct);

module.exports = Router;