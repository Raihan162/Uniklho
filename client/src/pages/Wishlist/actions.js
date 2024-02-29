import { ADD_WISHLIST, DELETE_WISHLIST, GET_WISHLIST, GET_WISHLIST_BY_PRODUCT, SET_WISHLIST, SET_WISHLIST_BY_PRODUCT } from "./constants";

export const getWishlist = () => ({
    type: GET_WISHLIST
});

export const setWishlist = (data) => ({
    type: SET_WISHLIST,
    data
});

export const addWishlist = (data,cb) => ({
    type: ADD_WISHLIST,
    data,
    cb
});

export const deleteWishlist = (id,cb) => ({
    type: DELETE_WISHLIST,
    id,
    cb
});

export const getWishlistByProduct = (id) => ({
    type: GET_WISHLIST_BY_PRODUCT,
    id
});

export const setWishlistByProduct = (data) => ({
    type: SET_WISHLIST_BY_PRODUCT,
    data
})