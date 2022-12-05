import { Product } from 'app-domain/model/product';

export interface GetAllProductStorageOutput {
  products: Product[];
}
export interface GetAllProductStorageError {
  type: 'GET_ALL_PRODUCT_STORAGE_ERROR',
  message: string;
}
