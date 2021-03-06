/* eslint-disable class-methods-use-this */
import { Product } from '../types/Products';
import httpServices from './httpServices';

export interface ApiProducts {
  products: Product[];
  nextPage?: number;
}

class ProductServices {
  async fetchByPage(page = 1, query: string = ''): Promise<ApiProducts> {
    const response = await httpServices.get<ApiProducts>(`/products?page=${page}&query=${query}`);
    return response.data;
  }
}

const productServices = new ProductServices();
export default productServices;
