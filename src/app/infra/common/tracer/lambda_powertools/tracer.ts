import { Tracer as LambdaTracer } from '@aws-lambda-powertools/tracer';
import { Tracer } from 'common/observability/tracer';

export const lambdaTracer = new LambdaTracer({ serviceName: 'robonaut' });

export const LAMBDA_TRACER: Tracer = {
  captureClient: <T>(service: T) => lambdaTracer.captureAWSv3Client(service)
};
