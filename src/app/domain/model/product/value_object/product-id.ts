import { createFailResult, createSuccesResult, Result } from 'common/interface/result';
import { ProductError, PRODUCT_ERROR_CODE } from '../error/product-error';

export interface ProductId {
  getValue(): string;
}

export interface CreateProductIdInput {
  id: string
}

export const createProductId = (input: CreateProductIdInput): Result<ProductId, ProductError> => {
  if (input.id.trim() === '') {
    const ProductError: ProductError = {
      errors: [{ code: PRODUCT_ERROR_CODE.PRODUCT_ID_EMPTY }]
    };
    return createFailResult(ProductError);
  }
  return createSuccesResult({ getValue: () => input.id });
};
