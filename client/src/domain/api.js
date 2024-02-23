import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',

  categoryList: 'category/list',

  productList: 'product/list',
  addProduct: 'product/admin/add',

  login: 'login'
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

export const getCategory = () => callAPI(urls.categoryList, 'GET');

export const addProductDomain = (formData) => callAPI(urls.addProduct, 'POST', {}, {}, formData);

export const loginApi = (data) => callAPI(urls.login, 'POST', {}, {}, data);