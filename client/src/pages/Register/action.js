import { SET_REGISTER, SET_STEP } from "./constant";

export const setStep = (step) => ({
    type: SET_STEP,
    step
});

export const setRegister = (data, cb) => ({
    type: SET_REGISTER,
    data,
    cb
})