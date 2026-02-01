import { GraphQLQuery, type GraphQLResult } from '@aws-amplify/api';
import { ArkError, type Type } from 'arktype';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLError } from 'graphql';
import type { ServiceIdentifier } from 'inversify';
import { injectable } from 'inversify';
import { NetworkError } from '../model/networkError';

export namespace GraphQlClient {
  @injectable()
  export class Default {
    async executeQuery<Schema extends Type>({
      query,
      params,
      schema,
      errorMapper,
    }: {
      query: string;
      params?: any;
      schema?: Schema;
      errorMapper?: (error: GraphQLError | ArkError) => any;
    }): Promise<Schema['infer']> {
      try {
        const response = await API.graphql<GraphQLQuery<any>>(
          graphqlOperation(query, params),
        );

        return schema?.assert(response.data) ?? response.data;
      } catch (error) {
        const typedResult = error as GraphQLResult<any> | ArkError;

        const typedError =
          typedResult instanceof ArkError
            ? typedResult
            : typedResult.errors![0];

        if (errorMapper) {
          return Promise.reject(errorMapper(typedError));
        }

        if (typedError instanceof GraphQLError) {
          switch (true) {
            case typedError.message.includes('Network Error'):
              return Promise.reject(new NetworkError.NoConnection(typedError));
            case typedError.message.includes('invalid value'):
              return Promise.reject(
                new NetworkError.InvalidVariable(typedError),
              );
            case typedError.message.includes('Validation error'):
              return Promise.reject(
                new NetworkError.RequestValidationFailed(typedError),
              );
            default:
              return Promise.reject(new NetworkError.Unknown(typedError));
          }
        } else if (typedError instanceof ArkError) {
          return Promise.reject(
            new NetworkError.ResponseValidationFailed(typedError),
          );
        } else {
          return Promise.reject(new NetworkError.Unknown(typedError));
        }
      }
    }
  }

  export type Tag = Default;
  export const Tag: ServiceIdentifier<Default> = Symbol.for('GraphQlClient');
}
