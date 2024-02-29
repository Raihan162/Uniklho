import { setLoading, showPopup } from "@containers/App/actions"
import { call, put, takeLatest } from "redux-saga/effects"
import { setWishlist, setWishlistByProduct } from "./actions";
import { ADD_WISHLIST, DELETE_WISHLIST, GET_WISHLIST, GET_WISHLIST_BY_PRODUCT } from "./constants";
import { addWishlistAPI, getWishlistAPI, getWishlistByProductAPI } from "@domain/api";
import toast from "react-hot-toast";

function* getDataWishlist() {
    yield put(setLoading(true))
    try {
        const response = yield call(getWishlistAPI);
        yield put(setWishlist(response?.response))
    } catch (error) {
        yield put(setLoading(false))
        yield put(showPopup(error))
    }
    yield put(setLoading(false))
};

function* doAddWishlist({ data, cb }) {
    yield put(setLoading(true))
    try {
        const response = yield call(addWishlistAPI, data);
        if (response?.response) {
            toast.success('Product add to wishlist');
        } else {
            toast.success('Product remove from wishlist')
        }
        cb && cb();
    } catch (error) {
        yield put(setLoading(false))
        toast.error(error?.response?.data?.message)
    }
    yield put(setLoading(false))
};

function* doDeleteWishlist({ id, cb }) {
    yield put(setLoading(true))
    try {
        const response = yield call();
    } catch (error) {
        yield put(setLoading(false))
        yield put(showPopup(error?.response))
    }
    yield put(setLoading(false))
};

function* doGetWishlistByProduct({ id }) {
    yield put(setLoading(true))
    try {
        const response = yield call(getWishlistByProductAPI, id);
        yield put(setWishlistByProduct(response?.response))
    } catch (error) {
        yield put(setLoading(false))
        yield put(showPopup(error?.response))
    }
    yield put(setLoading(false))
}

export default function* wishlistSaga() {
    yield takeLatest(GET_WISHLIST, getDataWishlist);
    yield takeLatest(ADD_WISHLIST, doAddWishlist);
    yield takeLatest(DELETE_WISHLIST, doDeleteWishlist);
    yield takeLatest(GET_WISHLIST_BY_PRODUCT, doGetWishlistByProduct);
}