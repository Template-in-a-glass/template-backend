import { GetAllProductStorageError } from 'app-core/port/infra/storage/product/dto/get-all';
import { createProduct, Product } from 'app-domain/model/product';
import { ProductErrorItem } from 'app-domain/model/product/error/product-error';
import { createProductId } from 'app-domain/model/product/value_object/product-id';
import { GetAllProductRepositoryError, GetAllProductRepositoryErrorItem, GetAllProductRepositoryOutput } from 'app-domain/repository/product_repository/dto/get-all';
import { createFailResult, createSuccesResult, Result } from 'common/interface/result';

const convertErrorToEntity = (input: ProductErrorItem): string => (input.code);

export const convertToEntity = (input: GetAllProductRepositoryOutput): Result<Product, GetAllProductRepositoryError> => {
  const errors: string[] = [];

  const createProductIdResult = createProductId({ id: input.id });
  if (createProductIdResult.isFail) {
    errors.push(...createProductIdResult.error.errors.map((value) => convertErrorToEntity(value)));
  }

  if (createProductIdResult.isSuccess) {
    const createProductResult = createProduct({
      id: createProductIdResult.data,
      name: input,
      price: createProductCurrencyResult.data,
      productValue: createProductValueResult.data
    });
    return createSuccesResult(createProductResult);
  }
  return createFailResult({ errors: errors.map((error) => ({ type: 'FX_RATE_REPOSITORY_ERROR', message: error })) });
};

export const convertGetAllProductStorageError = (input: GetAllProductStorageError): GetAllProductRepositoryErrorItem => ({
  type: 'FX_RATE_REPOSITORY_ERROR',
  message: input.message
});

export const convertGetAllProductRepositoryError = (input: GetAllProductRepositoryError[]): GetAllProductRepositoryError => ({
  errors: input.flatMap((inputErrors) => inputErrors.errors.map((error) => ({ type: 'FX_RATE_REPOSITORY_ERROR', message: `${error.type} ${error.message}` })))
});
