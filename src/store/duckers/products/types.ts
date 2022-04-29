/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from 'redux';
import { Product } from '../../../types/Products';

export type State = {
  list: Record<number, Product>;
  nextPage?: number;
};

export interface Actions {
  ADD_LIST: 'ADD_LIST';
  SET_PAGE: 'SET_PAGE';
  FETCH_PRODUCTS: 'FETCH_PRODUCTS';
}

export interface FetchProducts extends AnyAction {
  type: Actions['FETCH_PRODUCTS'];
}

export interface AddList extends AnyAction {
  type: Actions['ADD_LIST'];
  products: Product[];
}

export interface SetPage extends AnyAction {
  type: Actions['SET_PAGE'];
  page?: number;
}

export interface Reducers {
  setPage(page: number | undefined): SetPage;
  addList(products: Product[]): AddList;
  fetchProducts(): FetchProducts;
}
