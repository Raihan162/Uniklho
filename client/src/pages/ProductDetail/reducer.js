import { produce } from "immer";
import { SET_DATA } from "./constant";

export const initialState = {
    productDetail: {}
};

export const storedKey = ['productDetail'];

export const productDetailReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_DATA:
                draft.productDetail = action.data
                break;
            default:
                break;
        }
    })

export default productDetailReducer;