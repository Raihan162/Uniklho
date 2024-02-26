import { DELETE_CART, GET_CART, SET_CART } from "./constant";

export const getDataCart = () => ({
    type: GET_CART
});

export const setDataCart = (data) => ({
    type: SET_CART,
    data
});

export const deleteCart = (id, cb) => ({
    type: DELETE_CART,
    id,
    cb
})