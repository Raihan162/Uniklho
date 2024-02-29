import { GET_TRANSACTION, SET_TRANSACTION } from "./constant";

export const getTransaction = () => ({
    type: GET_TRANSACTION
});

export const setTransaction = (data) => ({
    type: SET_TRANSACTION,
    data
})