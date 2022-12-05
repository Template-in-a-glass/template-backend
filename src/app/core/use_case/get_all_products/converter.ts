import { ExportFxRateToOneDriveError } from 'app-core/port/api/export_fx_rate_to_onedrive/error';
import { ExportFxRateToOneDriveResponse } from 'app-core/port/api/export_fx_rate_to_onedrive/response';

export const convertResponse = (fxRateCount: number): ExportFxRateToOneDriveResponse => ({ result: 'OK', numberFxRateProcess: fxRateCount });

export const convertGetAllFxRateRepositoryError = (): ExportFxRateToOneDriveError => ({ type: 'DATABASE_ERROR' });

export const convertConvertToExcelError = (): ExportFxRateToOneDriveError => ({ type: 'EXCEL_ERROR' });

export const convertSaveBufferError = (): ExportFxRateToOneDriveError => ({ type: 'FILE_ERROR' });
