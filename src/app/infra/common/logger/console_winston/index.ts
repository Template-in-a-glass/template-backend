import { Logger } from 'common/observability/logger';
import { createLogger } from 'winston';
import { Console } from 'winston/lib/winston/transports';

const logger = createLogger({ transports: [new Console()] });

export const WINSTON_CONSOLE_LOGGER: Logger = {
  info: (message: string, object?: object) => { logger.info(message, { data: object }); },
  error: (message: string, object?: object) => { logger.error(message, { data: object }); }
};
