import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_PRODUCT, GET_CATEGORY, GET_PRODUCT } from "./constant";
import { addProductDomain, getCategory, getProduct } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";
import { setCategory, setProduct } from "./action";

function* getProductList() {
    yield put(setLoading(true));
    try {
        const response = yield call(getProduct);
        yield put(setProduct(response.response));
    } catch (error) {
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

function* getCategoryList() {
    yield put(setLoading(true));
    try {
        const response = yield call(getCategory);
        yield put(setCategory(response.response));
    } catch (error) {
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

function* addProduct({ formData, cb }) {
    yield put(setLoading(true));
    try {
        yield call(addProductDomain(formData));
        cb && cb();
    } catch (error) {
        console.log(error)
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
}

export default function* productSaga() {
    yield takeLatest(GET_PRODUCT, getProductList);
    yield takeLatest(GET_CATEGORY, getCategoryList);
    yield takeLatest(ADD_PRODUCT, addProduct)
}