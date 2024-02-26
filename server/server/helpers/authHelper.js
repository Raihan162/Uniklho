const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../models');
require('dotenv').config();

const fileName = 'server/helpers/authHelpers.js';

const db = require('../../models/index');
const GeneralHelper = require('../helpers/generalHelper');

const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
    return bcrypt.compareSync(payloadPass, dbPass);
};

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const register = async ({ name, email, password, contact, address, subdistrict, city, province }) => {
    try {
        const t = await sequelize.transaction()
        const checkEmail = await db.users.findOne({
            where: {
                email
            }
        });

        if (!_.isEmpty(checkEmail)) {
            return Promise.reject(Boom.badRequest('Email already registered'))
        };

        await db.users.create({
            id: uuidv4(),
            name,
            email,
            password: __hashPassword(password),
            contact,
            role_id: 2,
            address,
            subdistrict,
            city,
            province,
            photo_profile: null
        }, { transaction: t })

        await t.commit()
        return Promise.resolve(true);
    } catch (error) {
        await t.rollback()
        console.log([fileName, 'Register Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const login = async ({ email, password }) => {
    try {
        const checkAccount = await db.users.findOne({
            where: {
                email
            },
            include: {
                model: db.role,
                attributes: ['name']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (_.isEmpty(checkAccount)) {
            return Promise.reject(Boom.badRequest('Email not registered'))
        };

        const isPassMatched = __comparePassword(password, checkAccount.password);

        if (!isPassMatched) {
            return Promise.reject(Boom.badRequest('Wrong password'));
        };

        const token = __generateToken({
            id: checkAccount.id,
            name: checkAccount.name,
            photo_profile: checkAccount.photo_profile,
            role_id: checkAccount.role_id,
            role: checkAccount.role.name
        })

        return Promise.resolve({ token })
    } catch (error) {
        console.log([fileName, 'Login Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    register,
    login
}