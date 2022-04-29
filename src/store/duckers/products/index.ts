import _keyBy from 'lodash/keyBy';
import { createActions, createReducer } from 'reduxsauce';
import { Actions, Reducers, State, AddList, SetPage } from './types';

// Export Saga
export { default as productSaga } from './sagas';

// Create Initial state
export type { State };

const INITIAL_STATE: State = {
  list: {},
  nextPage: 1,
};

// Create action Types and Creators
export const { Types, Creators } = createActions<Actions, Reducers>({
  setPage: ['page'],
  addList: ['products'],
  fetchProducts: [],
});

// Create Reducer
const addList = (state = INITIAL_STATE, { products }: AddList): State => {
  const list = _keyBy(products, 'id');
  return {
    ...state,
    list: { ...state.list, ...list },
  };
};

const setPage = (state = INITIAL_STATE, { page }: SetPage): State => {
  return {
    ...state,
    nextPage: page,
  };
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_LIST]: addList,
  [Types.SET_PAGE]: setPage,
});
