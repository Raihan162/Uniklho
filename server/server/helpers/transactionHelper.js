const Boom = require('boom');
const _ = require('lodash');
// const { sequelize } = require('../../models');
require('dotenv').config();
const moment = require('moment');
const midtransClient = require('midtrans-client');

const fileName = 'server/helpers/transactionHelper.js';

const db = require('../../models/index');
const GeneralHelper = require('./generalHelper');
const { default: axios } = require('axios');

const createTransaction = async ({ name, contact, address, province, city, courier, service, cost, cart, dataToken }) => {

    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVERKEY_SB
    });

    const date = new Date().toJSON().slice(0, 10).split('-');
    let idTransaction = `INV/${date[0]}${date[1]}${date[2]}/ULO/${Math.floor(Math.random()*1000) + Date.now().toString().slice(10)}`;

    try {

        const result = await db.sequelize.transaction( async t => {
            const checkUser = await db.users.findOne({
                where: {
                    id: dataToken?.id
                },
                transaction: t
            });
    
            const createTrans = await db.transactions.create({
                id: idTransaction,
                user_id: dataToken?.id,
                receiver_name: name,
                receiver_contact: contact,
                receiver_address: address,
                receiver_province: province,
                receiver_city: city,
                courier,
                service,
                cost
            }, {
                transaction: t 
            });
    
            let dataCart = [];
            for (let i = 0; i < cart.length; i++) {
                dataCart.push({
                    product_id: cart[i]?.product_id,
                    qty: cart[i]?.qty,
                    transaction_id: createTrans?.id
                })
            };
    
            await db.transaction_details.bulkCreate(dataCart, { 
                transaction: t 
            });
    
            await db.cart.destroy({
                where: {
                    user_id: dataToken?.id 
                },
                transaction: t 
            });

            for (let i = 0; i < cart.length; i++) {
                const compare = await db.products.findOne({
                    where: {
                        id: cart[i]?.product_id
                    },
                    transaction: t
                });

                await db.products.update({
                    stock: compare?.stock - cart[i]?.qty
                }, {
                    where: {
                        id: cart[i]?.product_id
                    },
                    transaction: t
                });
            }
    
            const getTotalPrice = () => {
                let total_price = 0
                cart.forEach(async (item, index) => {
                    total_price += item?.qty * item?.product?.price
                })
                
                return total_price += JSON.parse(cost);
            };

            const arrayCart = () => {
                let newArr = [];

                for (let i = 0; i < cart?.length; i++) {
                    newArr.push({
                        "id": `PRODUCT-0${i+1}`,
                        "price": cart[i]?.product?.price,
                        "quantity": cart[i]?.qty,
                        "name": cart[i]?.product?.name
                    })
                }

                const shippingCost = {
                    id: "0",
                    price: JSON.parse(cost),
                    quantity: 1,
                    name: "Shipping Cost"
                }
                newArr.push(shippingCost)
                return newArr;
            }
    
            const parameter = {
                "transaction_details": {
                    "order_id": `MDT-ULO-${(Math.random()*1000) + Date.now().toString().slice(10)}`,
                    "gross_amount": getTotalPrice()
                },
                "item_details": arrayCart(),
                "customer_details": {
                    "name": checkUser?.name,
                    "email": checkUser?.email,
                    "phone": checkUser?.contact,
                    "shipping_address": {
                        "name": name,
                        "contact": contact,
                        "address": address,
                        "province": province,
                        "city": city
                    }
                }        
            };
    
            const transactionMidtrans = await snap.createTransaction(parameter);
    
            const response = transactionMidtrans.token;
    
            await db.transactions.update(
                {
                    token_midtrans: response
                },
                {
                    where: {
                        id: createTrans?.id
                    },
                    transaction: t
                }
            );
            const dataResponse = {
                token: response,
                transID: createTrans?.id
            };
            console.log(dataResponse, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,')
    
            return dataResponse;
        });

        return Promise.resolve(result)
    } catch (error) {
        console.log([fileName, 'Create Transaction Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const updatePayment = async({payment_type, gross_amount, transaction_status, transaction_id, dataToken}) => {
    console.log(transaction_id, 'INI TRANSACTION ID')
    try {

        await db.transactions.update({
            payment_method: payment_type,
            status_midtrans: transaction_status,
            total_cost: gross_amount?.split('.')[0],
            status_id: transaction_status === 'settlement' ? 3 : transaction_status === 'pending' ? 1 : 2
        },{
            where: {
                id: transaction_id
            }
        });

        return Promise.resolve(true)
    } catch (error) {
        console.log([fileName, 'Update Payment Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getTransaction = async({ dataToken }) => {
    try {
        const listOrder = await db.transactions.findAll({
            where: {
                user_id: dataToken?.id
            },
            include: [
                {
                    model: db.status
                },
                {
                    model: db.transaction_details,
                    include: {
                        model: db.products
                    }
                }
            ]
        });
        
        return Promise.resolve(listOrder)
    } catch (error) {
        console.log([fileName, 'Get Transaction Helpers', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
}

module.exports = {
    createTransaction,
    updatePayment,
    getTransaction
}