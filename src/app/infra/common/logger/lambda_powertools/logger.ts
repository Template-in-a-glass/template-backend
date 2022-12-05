import { Logger as PowerToolsLogger } from '@aws-lambda-powertools/logger';
import { Logger } from 'common/observability/logger';

export const powerToolsLogger = new PowerToolsLogger({ serviceName: 'robonaut' });

export const LAMBDA_LOGGER: Logger = {
  info: (message: string, object?: object) => { powerToolsLogger.info(message, { data: object }); },
  error: (message: string, object?: object) => { powerToolsLogger.error(message, { data: object }); }
};
