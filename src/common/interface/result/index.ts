export type Result<RESPONSE, ERROR> = { data: RESPONSE, isSuccess: true, isFail: false } | { error: ERROR, isSuccess: false, isFail: true };

export const createSuccesResult = <RESPONSE, ERROR>(data: RESPONSE): Result<RESPONSE, ERROR> => ({ data, isSuccess: true, isFail: false });

export const createFailResult = <RESPONSE, ERROR>(error: ERROR): Result<RESPONSE, ERROR> => ({ error, isSuccess: false, isFail: true });
