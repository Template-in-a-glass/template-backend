import { GetAllFxRateStorageError, GetAllFxRateStorageOutput } from 'app-core/port/infra/storage/product/dto/get-all';
import { JunoStorage } from 'app-core/port/infra/storage/product/product-storage';
import { Result } from 'common/interface/result';

interface FakeJunoStorageInput {
  getAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError>
}

export const fakeJunoStorage = (input: FakeJunoStorageInput): JunoStorage => {
  const getAllFxRate = async (): Promise<Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError>> => input.getAllFxRateResult;

  return {
    getAllFxRate
  };
};
