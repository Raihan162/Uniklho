import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_PRODUCT, DELETE_PRODUCT, GET_CATEGORY, GET_PRODUCT } from "./constant";
import { addProductDomain, deleteProductAPI, getCategory, getProduct } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";
import { setCategory, setProduct } from "./action";
import toast from "react-hot-toast";

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
        yield call(addProductDomain, formData);
        toast.success('Add Product Success')
        cb && cb();
    } catch (error) {
        console.log(error)
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
};

function* deleteProduct({ id, cb }) {
    yield put(setLoading(true));
    try {
        yield call(deleteProductAPI, id);
        toast.success('Delete Product Success')
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
    yield takeLatest(ADD_PRODUCT, addProduct);
    yield takeLatest(DELETE_PRODUCT, deleteProduct);
}