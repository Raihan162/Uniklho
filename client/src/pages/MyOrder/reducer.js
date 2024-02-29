import { produce } from "immer";
import { SET_TRANSACTION } from "./constant";

export const initialState = {
    transaction: []
};

export const storedKey = ['transaction'];

const myorderReducer = (state=initialState, action)=>
    produce(state, (draft)=>{
        switch (action.type) {
            case SET_TRANSACTION:
                draft.transaction = action.data
                break;
            default:
                break;
        }
    });

export default myorderReducer;