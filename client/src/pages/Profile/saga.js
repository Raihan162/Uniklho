import { setLoading, showPopup } from "@containers/App/actions"
import { getProfileUserAPI, updateImageUserAPI, updateProfileUserAPI } from "@domain/api";
import { put, call, takeLatest } from "redux-saga/effects"
import { setProfile } from "./action";
import { GET_PROFILE, UPDATE_IMAGE, UPDATE_PROFILE } from "./constant";
import toast from "react-hot-toast";

function* getProfileSaga() {
    yield put(setLoading(true))
    try {
        const response = yield call(getProfileUserAPI);
        yield put(setProfile(response?.response));
    } catch (error) {
        yield put(setLoading(false));
        yield put(showPopup(error))
    }
    yield put(setLoading(false));
};

function* updateProfileSaga({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(updateProfileUserAPI, data);
        toast.success('Update Profile Success');
        cb && cb();
    } catch (error) {
        yield put(setLoading(false));
        yield put(showPopup(error))
    }
    yield put(setLoading(false));
};

function* updateImageSaga({ data, cb }) {
    yield put(setLoading(true))
    try {
        yield call(updateImageUserAPI, data);
        toast.success('Update Image Success');
        cb && cb();
    } catch (error) {
        yield put(setLoading(false));
        yield put(showPopup(error))
    }
    yield put(setLoading(false));
}

export default function* profileSaga() {
    yield takeLatest(GET_PROFILE, getProfileSaga)
    yield takeLatest(UPDATE_PROFILE, updateProfileSaga)
    yield takeLatest(UPDATE_IMAGE, updateImageSaga)
};