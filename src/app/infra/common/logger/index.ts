import { Logger } from 'common/observability/logger';
import { WINSTON_CONSOLE_LOGGER } from './console_winston';
import { LAMBDA_LOGGER } from './lambda_powertools/logger';

const isLambda = !!process.env.LAMBDA_TASK_ROOT;

const configLogger = (): Logger => {
  if (isLambda) {
    return LAMBDA_LOGGER;
  }
  return WINSTON_CONSOLE_LOGGER;
};

export const LOGGER: Logger = configLogger();
