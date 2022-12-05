import { ConvertToExcelAdapterError, ConvertToExcelAdapterOutput } from 'app-core/port/infra/adapter/excel/dto/convert-to-excel';
import { UploadBufferToOneDriveAdapterError, UploadBufferToOneDriveAdapterOutput } from 'app-core/port/infra/adapter/ms/dto/upload-buffer-to-onedrive';
import { GetAllFxRateStorageError, GetAllFxRateStorageOutput } from 'app-core/port/infra/storage/product/dto/get-all';
import { createFailResult, createSuccesResult, Result } from 'common/interface/result';

export const correctGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createSuccesResult({
  fxRates: [{
    id: 'id',
    billingCurrency: 'USD',
    employeeCurrency: 'CNY',
    invoiceRate: 0.0134,
    month: new Date(2022, 1, 1),
    paydayRate: 0.0135
  },
  {
    id: 'id2',
    billingCurrency: 'USD',
    employeeCurrency: 'EUR',
    invoiceRate: 0.6234,
    month: new Date(2022, 2, 2),
    paydayRate: 0.6235
  }
  ]
});

export const correctConvertToExcelResult: Result<ConvertToExcelAdapterOutput, ConvertToExcelAdapterError> = createSuccesResult(
  { buffer: Buffer.from('Fake Data') }
);

export const correctUploadBufferToOneDriveResult: Result<UploadBufferToOneDriveAdapterOutput, UploadBufferToOneDriveAdapterError> = createSuccesResult(
  null
);

export const invalidIdGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createSuccesResult({
  fxRates: [{
    id: '',
    billingCurrency: 'USD',
    employeeCurrency: 'CNY',
    invoiceRate: 0.0134,
    month: new Date(2022, 1, 1),
    paydayRate: 0.0135
  }]
});

export const invalidCurrencyGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createSuccesResult({
  fxRates: [{
    id: 'id',
    billingCurrency: 'NOT_VALID',
    employeeCurrency: 'NOT_VALID',
    invoiceRate: 0.0134,
    month: new Date(2022, 1, 1),
    paydayRate: 0.0135
  }]
});

export const invalidRateGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createSuccesResult({
  fxRates: [{
    id: 'id',
    billingCurrency: 'USD',
    employeeCurrency: 'CNY',
    invoiceRate: -1,
    month: new Date(2022, 1, 1),
    paydayRate: -1
  }]
});

export const invalidMonthGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createSuccesResult({
  fxRates: [{
    id: 'id',
    billingCurrency: 'USD',
    employeeCurrency: 'CNY',
    invoiceRate: 0.0134,
    month: new Date('2022-42-22'),
    paydayRate: 0.0135
  }]
});

export const errorGetAllFxRateResult: Result<GetAllFxRateStorageOutput, GetAllFxRateStorageError> = createFailResult(
  {
    type: 'DATABASE_ERROR',
    message: 'Cannot connect to database'
  }
);

export const errorConvertToExcelResult: Result<ConvertToExcelAdapterOutput, ConvertToExcelAdapterError> = createFailResult(
  {
    type: 'SAVE_FILE_SERVICE_ERROR',
    message: 'Cannot convert to Excel'
  }
);

export const errorUploadBufferToOneDriveResult: Result<UploadBufferToOneDriveAdapterOutput, UploadBufferToOneDriveAdapterError> = createFailResult(
  {
    type: 'MS_ERROR',
    message: 'Cannot Upload to one drive'
  }
);
