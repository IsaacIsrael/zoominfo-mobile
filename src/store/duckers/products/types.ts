/* eslint-disable @typescript-eslint/ban-types */
import { AnyAction } from 'redux';
import { Product } from '../../../types/Products';

export type State = {
  list: Record<number, Product>;
  nextPage?: number;
  query?: string;
};

export interface Actions {
  SET_LIST: 'SET_LIST';
  ADD_LIST: 'ADD_LIST';
  SET_PAGE: 'SET_PAGE';
  SET_QUERY: 'SET_QUERY';
  FETCH_PRODUCTS: 'FETCH_PRODUCTS';
  SEARCH_PRODUCTS: 'SEARCH_PRODUCTS';
}

export interface FetchProducts extends AnyAction {
  type: Actions['FETCH_PRODUCTS'];
}

export interface SearchProducts extends AnyAction {
  type: Actions['SEARCH_PRODUCTS'];
  query?: string;
}

export interface SetList extends AnyAction {
  type: Actions['SET_LIST'];
  products: Product[];
}

export interface AddList extends AnyAction {
  type: Actions['ADD_LIST'];
  products: Product[];
}

export interface SetPage extends AnyAction {
  type: Actions['SET_PAGE'];
  page?: number;
}

export interface SetQuery extends AnyAction {
  type: Actions['SET_QUERY'];
  query?: string;
}

export interface Reducers {
  setList(products: Product[]): SetList;
  addList(products: Product[]): AddList;
  setPage(page: number | undefined): SetPage;
  setQuery(query: string | undefined): SetQuery;
  fetchProducts(): FetchProducts;
  searchProducts(query: string): SearchProducts;
}
