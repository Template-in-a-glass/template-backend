import { ExportFxRateToOneDriveError } from 'app-core/port/api/export_fx_rate_to_onedrive/error';
import { ExportFxRateToOneDriveRequest } from 'app-core/port/api/export_fx_rate_to_onedrive/request';
import { ExportFxRateToOneDriveResponse } from 'app-core/port/api/export_fx_rate_to_onedrive/response';
import { ProductRepository } from 'app-domain/repository/product_repository';
import { UseCase } from '../../common/use-case';
import { convertGetAllFxRateRepositoryError, convertResponse } from './converter';

export interface ExportFxRateToOneDriveInject {
  productRepository: ProductRepository;
}

export const exportFxRateToOneDriveUseCase
  : UseCase<ExportFxRateToOneDriveRequest, ExportFxRateToOneDriveResponse, ExportFxRateToOneDriveError, ExportFxRateToOneDriveInject> = async (
    _request,
    presenter,
    inject
  ) => {
    const { presentFail, presentSuccess } = presenter;
    const { productRepository, logger } = inject;

    const fxRateRepositoryGetAllResult = await productRepository.getAll();
    if (fxRateRepositoryGetAllResult.isFail) {
      // Stryker disable next-line all
      logger.error('exportFxRateToOneDriveUseCase fxRateRepositoryGetAllResult', { error: fxRateRepositoryGetAllResult.error });
      return presentFail(convertGetAllFxRateRepositoryError());
    }

    return presentSuccess(convertResponse(fxRateRepositoryGetAllResult.data.fxRates.length));
  };
