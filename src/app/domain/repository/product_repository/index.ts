import { Result } from 'common/interface/result';
import { AddProductRepositoryError, AddProductRepositoryInput, AddProductRepositoryOutput } from './dto/add';
import { GetAllProductRepositoryError, GetAllProductRepositoryOutput } from './dto/get-all';

export interface ProductRepository {
  getAll: () => Promise<Result<GetAllProductRepositoryOutput, GetAllProductRepositoryError>>;
  add: (input: AddProductRepositoryInput) => Promise<Result<AddProductRepositoryOutput, AddProductRepositoryError>>;
}
