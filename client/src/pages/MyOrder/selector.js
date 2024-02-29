import { createSelector } from "reselect";

const myorderState = (state) => {
    return state.myOrder || initialState
};

export const selectTransaction = createSelector(myorderState, (state) => state.transaction)