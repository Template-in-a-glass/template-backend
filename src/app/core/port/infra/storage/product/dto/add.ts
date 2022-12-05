import { Product } from 'app-domain/model/product';

export interface AddProductStorageInput {
  product: Product;
}
export interface AddProductStorageOutput {
  product: Product;
}
export interface AddProductStorageError {
  type: 'ADD_PRODUCT_STORAGE_ERROR',
  message: string;
}
