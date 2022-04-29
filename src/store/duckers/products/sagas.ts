/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import Logger from '../../../helper/Logger';
import { Creators as requestsReducer } from '../requests';
import { Creators as reducer, Types as Actions } from '.';
import { RootState } from '../../rootReducer';
import { FetchProducts, SearchProducts } from './types';
import productServices, { ApiProducts } from '../../../services/productServices';

function* fetchProducts(action: FetchProducts) {
  try {
    Logger.info('Product Fetch: Start fetching products');
    yield put(requestsReducer.requestStarted(action));

    const currentPage: number = yield select(({ products }: RootState) => products.nextPage);
    const query: string = yield select(({ products }: RootState) => products.query);
    
    const { products, nextPage }: ApiProducts = yield call([productServices, productServices.fetchByPage], currentPage, query);

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


function* searchProducts(action: SearchProducts) {
  try {
    const {query} = action;
    Logger.info('Search Fetch: Start searching products with ',query);
    console.log(action);
    yield put(requestsReducer.requestStarted(action));

    const { products, nextPage }: ApiProducts = yield call([productServices, productServices.fetchByPage], 1, query);

    yield put(reducer.setList(products));
    yield put(reducer.setPage(nextPage));
    yield put(reducer.setQuery(query));
    

    yield put(requestsReducer.requestSucceeded(action));
    Logger.success('Search Fetch: Searched products with success');
  } catch (e) {
    const error = e as Error;

    Logger.error('Search Fetch: Error to searched products', error.message);

    yield put(requestsReducer.requestFailed(action));
  } finally {
    yield put(requestsReducer.requestFinished(action));
  }
}

export default function* countSaga() {
  yield all([takeLatest(Actions.FETCH_PRODUCTS, fetchProducts), takeLatest(Actions.SEARCH_PRODUCTS, searchProducts)]);
}
