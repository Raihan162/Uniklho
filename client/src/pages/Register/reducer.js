import { produce } from "immer";
import { SET_REGISTER, SET_STEP } from "./constant";

export const initialState = {
    step: 1,
    register: {}
};

export const storedKey = ['step', 'register'];

const registerReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_STEP:
                draft.step = action.step
                break;
            default:
                break;
        }
    });

export default registerReducer;