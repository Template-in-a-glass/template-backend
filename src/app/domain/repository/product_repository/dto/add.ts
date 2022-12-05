import { Product } from 'app-domain/model/product';

export interface AddProductRepositoryInput {
  product: Product;
}
export interface AddProductRepositoryOutput {
  product: Product;
}
export interface AddProductRepositoryError {
  type: 'ADD_PRODUCT_REPOSITORY_ERROR',
  message: string;
}
