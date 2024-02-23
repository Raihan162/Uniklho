import { produce } from "immer";
import { SET_CATEGORY, SET_PRODUCT } from "./constant";

export const initialState = {
    product: [],
    category: []
};

export const storedKey = ['product', 'category'];

const productReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_PRODUCT:
                draft.product = action.data
                break;
            case SET_CATEGORY:
                draft.category = action.data
                break;
            default:
                break;
        }
    });

export default productReducer;