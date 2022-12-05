/* eslint-disable no-console */
import { Logger } from 'common/interface/observability/logger';

export const FakeLogger: Logger = {
  info: (message: string, object?: object) => { console.log(message, { data: object }); },
  error: (message: string, object?: object) => { console.error(message, { data: object }); }
};
