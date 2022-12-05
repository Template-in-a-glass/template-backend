import { Presenter } from '../use-case';

interface FakePresenterSpy<RESPONSE, ERROR> {
  getPresentFailCallCounter: () => number;
  getPresentFailCallInput: () => ERROR;
  getPresentSuccessCallCounter: () => number;
  getPresentSuccessCallInput: () => RESPONSE;
}

export const fakePresenter = <RESPONSE, ERROR>(): Presenter<RESPONSE, ERROR> & FakePresenterSpy<RESPONSE, ERROR> => {
  let presentFailCallCounter = 0;
  let presentFailCallInput: ERROR;
  let presentSuccessCallCounter = 0;
  let presentSuccessCallInput: RESPONSE;

  const presentSuccess = (input: RESPONSE): void => {
    presentSuccessCallInput = input;
    presentSuccessCallCounter += 1;
  };

  const presentFail = (input: ERROR): void => {
    presentFailCallInput = input;
    presentFailCallCounter += 1;
  };

  return {
    getPresentFailCallCounter: () => presentFailCallCounter,
    getPresentFailCallInput: () => presentFailCallInput,
    getPresentSuccessCallCounter: () => presentSuccessCallCounter,
    getPresentSuccessCallInput: () => presentSuccessCallInput,
    presentFail,
    presentSuccess
  };
};
