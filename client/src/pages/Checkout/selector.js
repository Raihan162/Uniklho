import { createSelector } from "reselect";
import { initialState } from "./reducer";

const checkoutState = (state) => {
    return state.checkout || initialState;
};

export const selectProvince = createSelector(checkoutState, (state) => state.province);

export const selectCity = createSelector(checkoutState, (state) => state.city);

export const selectService = createSelector(checkoutState, (state) => state.service);