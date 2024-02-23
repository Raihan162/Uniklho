import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import productSaga from '@pages/Admin/Product/saga';
import loginSaga from '@pages/Login/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    productSaga(),
    loginSaga()
  ]);
}
