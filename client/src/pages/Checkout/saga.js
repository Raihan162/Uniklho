import { setLoading } from "@containers/App/actions"
import toast from "react-hot-toast"
import { call, put, takeLatest } from "redux-saga/effects"
import { GET_CITY, GET_PROVINCE, GET_SERVICE, SET_PAYMENT, SET_TRANSACTION } from "./constant";
import { cityAPI, createTransactionAPI, provinceAPI, serviceAPI, updatePaymentAPI } from "@domain/api";
import { setDataCity, setDataProvince, setDataService } from "./action";

function* getProvince(){
    yield put(setLoading(true));
    try {
        const response = yield call(provinceAPI);
        yield put(setDataProvince(response?.response))
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
};

function* getCity({ id }){
    yield put(setLoading(true));
    try {
        const response = yield call(cityAPI, id);
        yield put(setDataCity(response?.response))
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
};

function* getService ({ destination, courier }) {
    yield put(setLoading(true));
    try {
        const response = yield call(serviceAPI,  destination, courier );
        yield put(setDataService(response?.response))
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message);
    }
    yield put(setLoading(false));
};

function* doTransaction({ data, cb }) {
    yield put(setLoading(true));
    try {
        const response = yield call(createTransactionAPI, data);
        toast.success(response?.message);
        cb && cb(response?.response);
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
};

function* updatePayment({data, cb}) {
    yield put(setLoading(true));
    try {
        console.log(data)
        const response = yield call(updatePaymentAPI, data);
        // toast.success(response?.message);
        cb && cb();
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* checkoutSaga(){
    yield takeLatest(GET_PROVINCE, getProvince);
    yield takeLatest(GET_CITY, getCity);
    yield takeLatest(GET_SERVICE, getService);
    yield takeLatest(SET_TRANSACTION, doTransaction);
    yield takeLatest(SET_PAYMENT, updatePayment);
}   