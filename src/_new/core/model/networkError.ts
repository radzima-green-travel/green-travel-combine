import { AppError } from './appError';
import { GraphQLError } from 'graphql';
import { AxiosError } from 'axios';
import type { ArkError } from 'arktype';

type NetworkErrorCause = GraphQLError | AxiosError | Error;

const Builder = AppError.createNamespace<'NetworkError', NetworkErrorCause>(
  'NetworkError',
);

export class NetworkError extends Builder.Base {}

export namespace NetworkError {
  export class Unknown extends Builder.Tagged('Unknown') {}
  export class NoConnectionError extends Builder.Tagged('NoConnectionError') {}
  export class InvalidVariableError extends Builder.Tagged(
    'InvalidVariableError',
  ) {}
  export class RequestValidationFailed extends Builder.Tagged(
    'RequestValidationFailed',
  ) {}
  export class ResponseValidationFailed extends Builder.Tagged<
    'ResponseValidationFailed',
    ArkError
  >('ResponseValidationFailed') {}
}
