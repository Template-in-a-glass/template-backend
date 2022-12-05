import { Logger } from "common/interface/observability/logger";


export interface UseCase<REQUEST, RESPONSE, ERROR, INJECT> {
  (request: REQUEST, presenter: Presenter<RESPONSE, ERROR>, inject: INJECT & { logger: Logger }): Promise<void>;
}

export interface Presenter<RESPONSE, ERROR> {
  presentSuccess(reponse: RESPONSE): void;
  presentFail(error: ERROR): void;
}
