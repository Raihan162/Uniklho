import { setLoading } from "@containers/App/actions";
import { addToCart, getProductDetailApi } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_DATA, SET_CART } from "./constant";
import { setData } from "./action";

function* getProductDetail({ id }) {
    yield put(setLoading(true));
    try {
        const response = yield call(getProductDetailApi, id);
        yield put(setData(response?.response))
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
};

function* doAddToCart({ data }) {
    yield put(setLoading(true));
    try {
        const response = yield call(addToCart, data);
        console.log(response)
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false));
}

export default function* productDetailSaga() {
    yield takeLatest(GET_DATA, getProductDetail)
    yield takeLatest(SET_CART, doAddToCart)
};