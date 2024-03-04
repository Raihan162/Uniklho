import { setLoading } from "@containers/App/actions"
import { call, put, takeLatest } from "redux-saga/effects"
import { DELETE_CART, GET_CART, UPDATE_CART } from "./constant";
import { deleteCartApi, getDataCartApi, updateQtyAPI } from "@domain/api";
import { setDataCart } from "./action";
import toast from "react-hot-toast";

function* getCart() {
    yield (put(setLoading(true)))
    try {
        const response = yield call(getDataCartApi);
        yield put(setDataCart(response?.response))
    } catch (error) {
        yield (put(setLoading(false)));
        toast.error(error?.response?.data?.message)
    }
    yield (put(setLoading(false)));
};

function* doDeleteCart({ id, cb }) {
    yield (put(setLoading(true)))
    try {
        const response = yield call(deleteCartApi, id);
        toast.success(response?.message);
        cb && cb();
    } catch (error) {
        yield (put(setLoading(false)));
        toast.error(error?.response?.data?.message)
    }
    yield (put(setLoading(false)));
};

function* updateCart({ data, cb }) {
    yield (put(setLoading(true)))
    try {
        yield call(updateQtyAPI, data);
        cb && cb();
    } catch (error) {
        yield (put(setLoading(false)));
        toast.error(error?.response?.data?.message)
    }
    yield (put(setLoading(false)));
}

export default function* cartSaga() {
    yield takeLatest(GET_CART, getCart);
    yield takeLatest(DELETE_CART, doDeleteCart);
    yield takeLatest(UPDATE_CART, updateCart);
};