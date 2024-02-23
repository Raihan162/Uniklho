import { ADD_PRODUCT, GET_CATEGORY, GET_PRODUCT, SET_CATEGORY, SET_PRODUCT } from "./constant";

export const getProduct = () => ({
    type: GET_PRODUCT
});

export const setProduct = (data) => ({
    type: SET_PRODUCT,
    data
});

export const getCategory = () => ({
    type: GET_CATEGORY
});

export const setCategory = (data) => ({
    type: SET_CATEGORY,
    data
});

export const addProductAction = (formData, cb) => ({
    type: ADD_PRODUCT,
    formData,
    cb
});