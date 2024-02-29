import { GET_CITY, GET_INFORMATION, GET_PROVINCE, GET_SERVICE, SET_CITY, SET_INFORMATION, SET_PAYMENT, SET_PROVINCE, SET_SERVICE, SET_TRANSACTION } from "./constant";

export const getDataProvince = () => ({
    type: GET_PROVINCE
});

export const setDataProvince = (dataProvince) => ({
    type: SET_PROVINCE,
    dataProvince
});

export const getDataCity = (id) => ({
    type: GET_CITY,
    id
});

export const setDataCity = (dataCity) => ({
    type: SET_CITY,
    dataCity
});

export const getDataService = (destination, courier) => ({
    type: GET_SERVICE,
    destination,
    courier
});

export const setDataService = (dataService) => ({
    type: SET_SERVICE,
    dataService
});

export const getDataInformation = () => ({
    type: GET_INFORMATION
});

export const setDataInformation = (data) => ({
    type: SET_INFORMATION,
    data
});

export const setTransaction = (data, cb) => ({
    type: SET_TRANSACTION,
    data,
    cb
});

export const setPayment = (data, cb) => ({
    type: SET_PAYMENT,
    data,
    cb
})