import { GET_DATA, SET_CART, SET_DATA } from "./constant";

export const getData = (id) => ({
    type: GET_DATA,
    id
});

export const setData = (data) => ({
    type: SET_DATA,
    data
});

export const setCart = (dataCart, cb) => ({
    type: SET_CART,
    dataCart,
    cb
})