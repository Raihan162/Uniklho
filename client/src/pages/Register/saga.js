import { setLoading, showPopup } from "@containers/App/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { SET_REGISTER } from "./constant";
import { registerApi } from "@domain/api";
import toast from "react-hot-toast";

function* doRegister({ data, cb }) {
    yield put(setLoading(true));
    try {
        const response = yield call(registerApi, data);
        toast.success(response?.message);
        cb && cb();
    } catch (error) {
        console.log(error)
        yield put(setLoading(false));
        yield put(showPopup(error?.response?.data?.message))
    }
    yield put(setLoading(false));
};

export default function* registerSaga() {
    yield takeLatest(SET_REGISTER, doRegister)
}