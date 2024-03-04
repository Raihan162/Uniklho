import { createSelector } from "reselect";
import { initialState } from "./reducer"

const profileState = (state) => state.profile || initialState;

export const selectProfile = createSelector(profileState, (state) => state.profile);