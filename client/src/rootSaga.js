import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import productSaga from '@pages/Admin/Product/saga';
import loginSaga from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';
import productDetailSaga from '@pages/ProductDetail/saga';
import cartSaga from '@pages/Cart/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    productSaga(),
    loginSaga(),
    registerSaga(),
    productDetailSaga(),
    cartSaga()
  ]);
}
