import { all, fork } from 'redux-saga/effects';
import { productSaga } from './duckers/products';

export default function* rootSaga(): any {
  return yield all([fork(productSaga)]);
}
