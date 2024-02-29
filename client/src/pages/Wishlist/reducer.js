import { produce } from "immer";
import { GET_WISHLIST_BY_PRODUCT, SET_WISHLIST, SET_WISHLIST_BY_PRODUCT } from "./constants";

export const initialState ={
    wishlist: [],
    wishlistByProduct: {}
};

export const storedKey = ['wishlist', 'wishlistByProduct'];

const wishlistReducer = (state = initialState, action)=>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_WISHLIST:
                draft.wishlist = action.data
                break;
            case SET_WISHLIST_BY_PRODUCT:
                draft.wishlistByProduct = action.data
                break;
            default:
                break;
        }
    });

export default wishlistReducer;