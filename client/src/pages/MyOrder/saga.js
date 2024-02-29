import { setLoading } from "@containers/App/actions"
import { call, put, takeLatest } from "redux-saga/effects"
import { GET_TRANSACTION } from "./constant";
import { getTransactionAPI } from "@domain/api";
import { setTransaction } from "./action";

function* doGetTransaction() {
    yield put(setLoading(true))
    try {
        const response = yield call(getTransactionAPI);
        yield put(setTransaction(response?.response))
    } catch (error) {
        yield put(setLoading(false))
        console.log(error)
    }
    yield put(setLoading(false))
};

export default function* myorderSaga() {
    yield takeLatest(GET_TRANSACTION, doGetTransaction)
}