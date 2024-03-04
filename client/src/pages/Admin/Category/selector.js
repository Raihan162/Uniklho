import { createSelector } from "reselect";
import { initialState } from "./reducer";

const productState = (state) => {
    return state.product || initialState;
};

export const selectCategory = createSelector(productState, (state) => state.category);