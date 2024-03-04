import { GET_PROFILE, SET_PROFILE, UPDATE_IMAGE, UPDATE_PROFILE } from "./constant";

export const getProfile = () => ({
    type: GET_PROFILE
});

export const setProfile = (data) => ({
    type: SET_PROFILE,
    data
});

export const updateProfile = (data, cb) => ({
    type: UPDATE_PROFILE,
    data,
    cb
});

export const updateImage = (data, cb) => ({
    type: UPDATE_IMAGE,
    data,
    cb
})