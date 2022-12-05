import { ConvertToExcelAdapterError, ConvertToExcelAdapterInput, ConvertToExcelAdapterOutput } from 'app-core/port/infra/adapter/excel/dto/convert-to-excel';
import { ExcelAdapter } from 'app-core/port/infra/adapter/excel/excel-adapter';
import { Result } from 'common/interface/result';

interface FakeExcelAdapaterInput {
  convertToExcelResult: Result<ConvertToExcelAdapterOutput, ConvertToExcelAdapterError>
}

export interface FakeExcelAdapaterSpy<T> {
  getInputCallconvertToExcel: () => ConvertToExcelAdapterInput<T>;
}

export const fakeExcelAdapter = <T>(input: FakeExcelAdapaterInput): ExcelAdapter & FakeExcelAdapaterSpy<T> => {
  let inputCallconvertToExcel: ConvertToExcelAdapterInput<T>;

  const convertToExcel = async <R>(convertToExcelAdapterInput: ConvertToExcelAdapterInput<R>)
    : Promise<Result<ConvertToExcelAdapterOutput, ConvertToExcelAdapterError>> => {
    inputCallconvertToExcel = convertToExcelAdapterInput as unknown as ConvertToExcelAdapterInput<T>;
    return input.convertToExcelResult;
  };

  return {
    convertToExcel,
    getInputCallconvertToExcel: () => inputCallconvertToExcel
  };
};
