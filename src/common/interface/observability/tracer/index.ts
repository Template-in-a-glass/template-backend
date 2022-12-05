export interface Tracer {
  captureClient<T>(service: T): T;
}
