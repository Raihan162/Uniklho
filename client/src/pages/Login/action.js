import { SET_LOGIN } from "@containers/Client/constants";
import { DO_LOGIN } from "./constant";

export const doLogin = (data, cb) => ({
    type: DO_LOGIN,
    data,
    cb
});

export const setLogin = (data) => ({
    type: SET_LOGIN,
    data
})