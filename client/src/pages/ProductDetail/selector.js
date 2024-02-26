import { createSelector } from "reselect";
import { initialState } from "./reducer";

const productDetailState = (state) => {
    return state.productDetail || initialState
};

export const selectDetail = createSelector(productDetailState, (state) => state.productDetail);