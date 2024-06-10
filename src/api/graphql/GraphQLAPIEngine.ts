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
      const graphQLError = error as any;

      if (graphQLError.message?.includes('Network error')) {
        return Promise.reject(
          new RequestError(
            createInternetConnectionErrorPreset(graphQLError.message),
          ),
        );
      }

      const customError = new RequestError(
        createErrorPreset({
          message: graphQLError?.errors[0].message,
          code: graphQLError?.errors[0]?.code || 'UNKNOWN_ERROR',
          status: graphQLError?.errors[0]?.status || 0,
          methodName: query.trim().split(' ')[0] || '',
          ...((errorMap && errorMap(graphQLError)) || {}),
        }),
      );
      return Promise.reject(customError);
    }
  }
}
