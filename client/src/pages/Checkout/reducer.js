import { produce } from "immer";
import { SET_CITY, SET_INFORMATION, SET_PROVINCE, SET_SERVICE } from "./constant";

export const initialState={
    province: [],
    city: [],
    service: [],
    information: []
};

export const storedKey = ['province', 'city', 'service'];

const checkoutReducer = (state = initialState, action)=>
    produce(state, (draft)=>{
        switch (action.type) {
            case SET_PROVINCE:
                draft.province = action.dataProvince
                break;
            case SET_CITY:
                draft.city = action.dataCity
                break;
            case SET_SERVICE:
                draft.service = action.dataService
                break;
            case SET_INFORMATION:
                draft.information = action.data
                break;
            default:
                break;
        }
});

export default checkoutReducer;
