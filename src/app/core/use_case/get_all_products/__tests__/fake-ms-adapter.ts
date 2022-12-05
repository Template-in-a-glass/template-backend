import {
  UploadBufferToOneDriveAdapterError,
  UploadBufferToOneDriveAdapterInput,
  UploadBufferToOneDriveAdapterOutput
} from 'app-core/port/infra/adapter/ms/dto/upload-buffer-to-onedrive';
import { MsAdapter } from 'app-core/port/infra/adapter/ms/ms-adapter';
import { Result } from 'common/interface/result';

interface FakeExcelAdapaterInput {
  uploadBufferToOneDriveResult: Result<UploadBufferToOneDriveAdapterOutput, UploadBufferToOneDriveAdapterError>
}

export interface FakeMsAdapaterSpy {
  getInputCallUploadBufferToOneDrive: () => UploadBufferToOneDriveAdapterInput;
}

export const fakeMsAdapater = (input: FakeExcelAdapaterInput): MsAdapter & FakeMsAdapaterSpy => {
  let inputCallUploadBufferToOneDrive: UploadBufferToOneDriveAdapterInput;

  const uploadBufferToOneDrive = async (uploadBufferToOneDriveAdapterInput: UploadBufferToOneDriveAdapterInput)
    : Promise<Result<UploadBufferToOneDriveAdapterOutput, UploadBufferToOneDriveAdapterError>> => {
    inputCallUploadBufferToOneDrive = uploadBufferToOneDriveAdapterInput;
    return input.uploadBufferToOneDriveResult;
  };

  return {
    uploadBufferToOneDrive,
    getInputCallUploadBufferToOneDrive: () => inputCallUploadBufferToOneDrive
  };
};
