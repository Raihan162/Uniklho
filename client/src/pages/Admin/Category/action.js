import { GET_CATEGORY, SET_CATEGORY, ADD_CATEGORY } from "./constant";

export const getCategory = () => ({
    type: GET_CATEGORY
});

export const setCategory = (data) => ({
    type: SET_CATEGORY,
    data
});

export const addCategoryAction = (data, cb) => ({
    type: ADD_CATEGORY,
    data,
    cb
});

// export const deleteCategoryAction = (id, cb) => ({
//     type:  DELETE_PRODUCT,
//     id,
//     cb
// });