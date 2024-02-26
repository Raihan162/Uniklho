import { createSelector } from "reselect"
import { initialState } from "./reducer"

const cartState = (state) => {
    return state.cart || initialState
};

export const selectCart = createSelector(cartState, (state) => state.cart)