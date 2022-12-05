import { Result } from 'common/interface/result';
import { AddProductStorageError, AddProductStorageInput, AddProductStorageOutput } from './dto/add';
import { GetAllProductStorageError, GetAllProductStorageOutput } from './dto/get-all';

export interface ProductStorage {
  add: (input: AddProductStorageInput) => Promise<Result<AddProductStorageOutput, AddProductStorageError>>;
  getAll: () => Promise<Result<GetAllProductStorageOutput, GetAllProductStorageError>>;
}
