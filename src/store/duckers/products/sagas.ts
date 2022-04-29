/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import Logger from '../../../helper/Logger';
import { Creators as requestsReducer } from '../requests';
import { Creators as reducer, Types as Actions } from '.';
import { RootState } from '../../rootReducer';
import { FetchProducts } from './types';
import productServices, { ApiProducts } from '../../../services/productServices';

function* fetchProducts(action: FetchProducts) {
  try {
    Logger.info('Product Fetch: Start fetching products');
    yield put(requestsReducer.requestStarted(action));

    const currentPage: number = yield select(({ products }: RootState) => products.nextPage);
    const { products, nextPage }: ApiProducts = yield call([productServices, productServices.fetchByPage], currentPage);

    yield put(reducer.setPage(nextPage));
    yield put(reducer.addList(products));

    yield put(requestsReducer.requestSucceeded(action));
    Logger.success('Product Fetch: Fetched products with success');
  } catch (e) {
    const error = e as Error;

    Logger.error('Product Fetch: Error to fetched products', error.message);

    yield put(requestsReducer.requestFailed(action));
  } finally {
    yield put(requestsReducer.requestFinished(action));
  }
}

export default function* countSaga() {
  yield all([takeLatest(Actions.FETCH_PRODUCTS, fetchProducts)]);
}
