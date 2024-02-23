const Router = require('express').Router();
const CryptoJS = require('crypto-js');

const GeneralHelper = require('../helpers/generalHelper');
const Validation = require('../helpers/validationHelper');
const WishlistHelper = require('../helpers/wishlistHelper');
const Middleware = require('../middleware/authMiddleware');

const fileName = 'server/api/wishlist.js';



module.exports = Router;