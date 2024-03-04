import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_CATEGORY, GET_CATEGORY } from "./constant";
import { addCategoryAPI, getCategory } from "@domain/api";
import { setLoading, showPopup } from "@containers/App/actions";
import { setCategory } from "./action";
import toast from "react-hot-toast";

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

function* addCategory({ data, cb }) {
    yield put(setLoading(true));
    try {
        yield call(addCategoryAPI, { name: data });
        toast.success('Add Category Success')
        cb && cb();
    } catch (error) {
        console.log(error)
        yield put(showPopup(error));
    }
    yield put(setLoading(false));
}

// function* deleteProduct({ id, cb }) {
//     yield put(setLoading(true));
//     try {
//         yield call(deleteProductAPI, id);
//         toast.success('Delete Product Success')
//         cb && cb();
//     } catch (error) {
//         console.log(error)
//         yield put(showPopup(error));
//     }
//     yield put(setLoading(false));
// }

export default function* categorySaga() {
    yield takeLatest(GET_CATEGORY, getCategoryList);
    yield takeLatest(ADD_CATEGORY, addCategory);
}