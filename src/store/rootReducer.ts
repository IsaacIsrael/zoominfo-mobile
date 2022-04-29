import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import requestsReducers, { State as RequestsState } from './duckers/requests';
import productsReducers, { State as ProductsState } from './duckers/products';

// eslint-disable-next-line @typescript-eslint/ban-types
export type RootState = {
  requests: RequestsState;
  products: ProductsState;
};

const rootReducer = combineReducers({
  requests: requestsReducers,
  products: productsReducers,
});

const persistConfig = {
  key: 'LIFTED_REDUX_STORE',
  storage: AsyncStorageLib,
  whitelist: [''],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
