import { Product } from 'app-domain/model/product';

export interface GetAllProductRepositoryOutput {
  products: Product[];
}
export interface GetAllProductRepositoryError {
  type: 'GET_ALL_PRODUCT_REPOSITORY_ERROR',
  message: string;
}
