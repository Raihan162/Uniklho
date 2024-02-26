import { setLoading, showPopup } from "@containers/App/actions";
import { loginApi } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { DO_LOGIN } from "./constant";
import { setLogin, setToken } from "@containers/Client/actions";
import toast from "react-hot-toast";

function* doLoginSaga({ data, cb }) {
    yield put(setLoading(true));
    try {
        const response = yield call(loginApi, data);
        yield put(setLogin(true));
        yield put(setToken(response?.response?.token));
        cb && cb(response?.response?.token);
    } catch (error) {
        yield put(setLoading(false));
        toast.error(error?.response?.data?.message);
    }
    yield put(setLoading(false));
};

export default function* loginSaga() {
    yield takeLatest(DO_LOGIN, doLoginSaga);
}