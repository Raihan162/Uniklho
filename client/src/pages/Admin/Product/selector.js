import { createSelector } from "reselect";
import { initialState } from "./reducer";

const productState = (state) => {
    return state.product || initialState;
};

export const selectProduct = createSelector(productState, (state) => state.product);

export const selectCategory = createSelector(productState, (state) => state.category);