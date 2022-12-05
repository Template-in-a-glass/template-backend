import { ProductStorage } from 'app-core/port/infra/storage/product/product-storage';
import { Product } from 'app-domain/model/product';
import { ProductRepository } from 'app-domain/repository/product_repository';
import { GetAllProductRepositoryError, GetAllProductRepositoryOutput } from 'app-domain/repository/product_repository/dto/get-all';
import { createFailResult, createSuccesResult, Result } from 'common/interface/result';
import { convertGetAllProductRepositoryError, convertGetAllProductStorageError, convertToEntity } from './converter';

export interface ProductRepositoryImplInject {
  productStorage: ProductStorage;
}

export const productRepositoryImpl = (inject: ProductRepositoryImplInject): ProductRepository => {
  const { productStorage } = inject;

  const getAll = async (): Promise<Result<GetAllProductRepositoryOutput, GetAllProductRepositoryError>> => {
    const getAllProductResult = await productStorage.getAll();
    if (getAllProductResult.isFail) {
      return createFailResult({ errors: [convertGetAllProductStorageError(getAllProductResult.error)] });
    }

    const convertToEntityResults = getAllProductResult.data.products.reduce<{ success: Product[], error: GetAllProductRepositoryError[] }>((previous, current) => {
      const convertToEntityResult = convertToEntity(current);
      if (convertToEntityResult.isFail) {
        previous.error.push(convertToEntityResult.error);
        return {
          success: previous.success,
          error: previous.error
        };
      }
      previous.success.push(convertToEntityResult.data);
      return {
        success: previous.success,
        error: previous.error
      };
    }, { success: [], error: [] });
    if (convertToEntityResults.error.length > 0) {
      return createFailResult(convertGetAllProductRepositoryError(convertToEntityResults.error));
    }
    return createSuccesResult({ products: convertToEntityResults.success });
  };

  return {
    getAll
  };
};
