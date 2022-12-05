import { createFailResult, createSuccesResult, Result } from 'common/interface/result';
import { ProductError, ProductErrorItem, PRODUCT_ERROR_CODE } from './error/product-error';
import { ProductId } from './value_object/product-id';

export interface Product {
  getId: () => ProductId;
  getName: () => string;
  getPrice: () => number;
}

export interface CreateProductInput {
  id: ProductId;
  name: string;
  price: number;
}

export const createProduct = (input: CreateProductInput): Result<Product, ProductError> => {
  const errorsItems: ProductErrorItem[] = []
  if (input.name.trim() === '') {
    errorsItems.push({ code: PRODUCT_ERROR_CODE.PRODUCT_NAME_EMPTY })
  }

  if (input.price < 0) {
    errorsItems.push({ code: PRODUCT_ERROR_CODE.PRODUCT_PRICE_NEGATIVE })
  }
  if (errorsItems.length > 0) {
    return createFailResult({ errors: errorsItems });
  }

  return createSuccesResult({
    getId: () => input.id,
    getName: () => input.name,
    getPrice: () => input.price
  })
};
