import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',

  categoryList: 'category/list',

  productList: 'product/list',
  addProduct: 'product/admin/add',

  addToCart: 'cart/add',
  cartList: 'cart/list',
  cartDelete: 'cart/delete',

  login: 'login',
  register: 'register',

  rajaongkirProvince: 'rajaongkir/province',
  rajaongkirCity: 'rajaongkir/city',
  rajaongkirCost: 'rajaongkir/cost',

  createTransaction: 'transaction/create',
  updatePayment: 'transaction/payment/update',
  transactionList: 'transaction/list',

  addWishlist: 'wishlist/add',
  getWishlist: 'wishlist/list',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const getProduct = () => callAPI(urls.productList, 'GET');
export const getProductDetailApi = (id) => callAPI(`${urls.productList}/${id}`, 'GET');
export const addProductDomain = (formData) => callAPI(urls.addProduct, 'POST', {}, {}, formData);

export const getCategory = () => callAPI(urls.categoryList, 'GET');
export const loginApi = (data) => callAPI(urls.login, 'POST', {}, {}, data);
export const registerApi = (data) => callAPI(urls.register, 'POST', {}, {}, data);

export const addToCart = (data) => callAPI(urls.addToCart, 'POST', {}, {}, data);
export const getDataCartApi = () => callAPI(urls.cartList, 'GET');
export const deleteCartApi = (id) => callAPI(`${urls.cartDelete}/${id}`, 'DELETE');

export const provinceAPI = () => callAPI(urls.rajaongkirProvince, 'GET');
export const cityAPI = (id) => callAPI(`${urls.rajaongkirCity}?province_id=${id}`,);
export const serviceAPI = ( destination, courier ) => callAPI(`${urls.rajaongkirCost}?destination=${destination}&courier=${courier}`, 'POST');

export const createTransactionAPI = (data) => callAPI(urls.createTransaction, 'POST', {}, {}, data);
export const updatePaymentAPI = (data) => callAPI(urls.updatePayment, 'PATCH', {}, {}, data);
export const getTransactionAPI = (data) => callAPI(urls.transactionList, 'GET', {}, {}, data);

export const addWishlistAPI = (data) => callAPI(urls.addWishlist, 'POST', {}, {}, data);
export const getWishlistAPI = () => callAPI(urls.getWishlist, 'GET');
export const getWishlistByProductAPI = (id) => callAPI(`${urls.getWishlist}/${id}`, 'GET');