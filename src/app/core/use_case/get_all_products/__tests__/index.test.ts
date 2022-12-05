import { fxRateRepositoryImpl } from 'app-core/acl/repository/product_repository';
import { excelServiceImpl } from 'app-core/acl/service/excel';
import { fileServiceImpl } from 'app-core/acl/service/file';
import { FakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { ExportFxRateToOneDriveError } from 'app-core/port/api/export_fx_rate_to_onedrive/error';
import { ExportFxRateToOneDriveResponse } from 'app-core/port/api/export_fx_rate_to_onedrive/response';
import { ExcelAdapter } from 'app-core/port/infra/adapter/excel/excel-adapter';
import { MsAdapter } from 'app-core/port/infra/adapter/ms/ms-adapter';
import { JunoStorage } from 'app-core/port/infra/storage/product/product-storage';
import { FxRate } from 'app-domain/model/product';
import { TestExpectedResult } from 'common/test/test-expected-result';
import { ExportFxRateToOneDriveInject, exportFxRateToOneDriveUseCase } from '..';
import {
  correctConvertToExcelResult, correctGetAllFxRateResult,
  correctUploadBufferToOneDriveResult, errorConvertToExcelResult, errorGetAllFxRateResult,
  errorUploadBufferToOneDriveResult,
  invalidCurrencyGetAllFxRateResult, invalidIdGetAllFxRateResult,
  invalidMonthGetAllFxRateResult, invalidRateGetAllFxRateResult
} from './data-test';
import { FakeExcelAdapaterSpy, fakeExcelAdapter } from './fake-excel-adapter';
import { fakeJunoStorage } from './fake-juno-storage';
import { fakeMsAdapater, FakeMsAdapaterSpy } from './fake-ms-adapter';

interface TestExpectedResultInput {
  junoStorage: JunoStorage,
  excelAdapter: ExcelAdapter & FakeExcelAdapaterSpy<FxRate>,
  msAdapter: MsAdapter & FakeMsAdapaterSpy
}
interface TestExpectedResultExpected {
  response?: ExportFxRateToOneDriveResponse
  error?: ExportFxRateToOneDriveError
}

const testAllCorrect = (): TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected> => {
  const correctExcelAdapter = fakeExcelAdapter<FxRate>({ convertToExcelResult: correctConvertToExcelResult });
  const correctMsAdapter = fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult });
  return {
    title: 'all Correct',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: correctGetAllFxRateResult }),
      excelAdapter: correctExcelAdapter,
      msAdapter: correctMsAdapter
    },
    expected: {
      response: { result: 'OK', numberFxRateProcess: 2 }
    }
  };
};

const testExpectedResults: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Invalid Id',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: invalidIdGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'DATABASE_ERROR' }
    }
  },
  {
    title: 'Invalid Currency',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: invalidCurrencyGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'DATABASE_ERROR' }
    }
  },
  {
    title: 'Invalid Rate',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: invalidRateGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'DATABASE_ERROR' }
    }
  },
  {
    title: 'Invalid Month',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: invalidMonthGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'DATABASE_ERROR' }
    }
  },
  {
    title: 'Error Database',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: errorGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'DATABASE_ERROR' }
    }
  },
  {
    title: 'Error Convert Excel',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: correctGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: errorConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: correctUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'EXCEL_ERROR' }
    }
  },
  {
    title: 'Error Upload One drive',
    input: {
      junoStorage: fakeJunoStorage({ getAllFxRateResult: correctGetAllFxRateResult }),
      excelAdapter: fakeExcelAdapter({ convertToExcelResult: correctConvertToExcelResult }),
      msAdapter: fakeMsAdapater({ uploadBufferToOneDriveResult: errorUploadBufferToOneDriveResult })
    },
    expected: {
      error: { type: 'FILE_ERROR' }
    }
  },
  testAllCorrect()
];
describe('Export FxRate To OneDrive UseCase Test', async () => {
  it.each(testExpectedResults)('Export FxRate To OneDrive with arguments %p', async (testExpectedResult) => {
    // arrange
    const { junoStorage, excelAdapter, msAdapter } = testExpectedResult.input;
    const logger = FakeLogger;
    const inject: ExportFxRateToOneDriveInject = {
      logger,
      fxRateRepository: fxRateRepositoryImpl({ junoStorage }),
      fileService: fileServiceImpl({ msAdapter, logger }),
      excelService: excelServiceImpl({ excelAdapter })
    };
    const presenter = fakePresenter<ExportFxRateToOneDriveResponse, ExportFxRateToOneDriveError>();

    // act
    await exportFxRateToOneDriveUseCase(null, presenter, inject);

    // assert
    const { response, error } = testExpectedResult.expected;
    // presenter
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);

    // msAdapter
    if (excelAdapter.getInputCallconvertToExcel()) {
      expect(excelAdapter.getInputCallconvertToExcel().data).toBeDefined();
      expect(excelAdapter.getInputCallconvertToExcel().data.length).toStrictEqual(2);
    }
    // msAdapter
    if (msAdapter.getInputCallUploadBufferToOneDrive()) {
      expect(msAdapter.getInputCallUploadBufferToOneDrive().buffer).toBeDefined();
      expect(msAdapter.getInputCallUploadBufferToOneDrive().fileName).toStrictEqual('fx_rate.xlsx');
      expect(msAdapter.getInputCallUploadBufferToOneDrive().folder).toStrictEqual('/General/extract_data_platform');
    }
  });
});
