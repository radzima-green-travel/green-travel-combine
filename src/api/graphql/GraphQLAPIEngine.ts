import {GraphQLResult} from '@aws-amplify/api-graphql';
import {graphqlOperation, API} from 'aws-amplify';
import {GraphQLError} from 'graphql';
import {
  RequestError,
  createErrorPreset,
  createInternetConnectionErrorPreset,
} from 'core/errors';
import {ErrorPresetParams} from 'core/types';

export class GraphQLAPIEngine {
  async executeQuery({
    query,
    params,
    errorMap,
  }: {
    query: string;
    params?: any;
    errorMap?: (e: GraphQLError) => Partial<ErrorPresetParams>;
  }) {
    try {
      const response = (await API.graphql(
        graphqlOperation(query, params),
      )) as GraphQLResult<any>;
      return response.data;
    } catch (error) {
      const graphQLError = error as GraphQLError;

      if (graphQLError.message.includes('Network error')) {
        return Promise.reject(
          new RequestError(
            createInternetConnectionErrorPreset(graphQLError.message),
          ),
        );
      }

      const customError = new RequestError(
        createErrorPreset({
          message: graphQLError.message,
          code: graphQLError.extensions?.code || 'UNKNOWN_ERROR',
          status: graphQLError.extensions?.status || 0,
          methodName: graphQLError.path?.join('.') || '',
          ...((errorMap && errorMap(graphQLError)) || {}),
        }),
      );
      return Promise.reject(customError);
    }
  }
}
