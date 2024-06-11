import {GraphQLResult} from '@aws-amplify/api-graphql';
import {graphqlOperation, API} from 'aws-amplify';
import {GraphQLError} from 'graphql';
import {
  RequestError,
  createErrorPreset,
  createInternetConnectionErrorPreset,
  createInvalidVariableErrorPreset,
  createValidationErrorPreset,
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
      const errorMessage = graphQLError?.errors[0].message || '';

      if (errorMessage.includes('Network Error')) {
        return Promise.reject(
          new RequestError(createInternetConnectionErrorPreset(errorMessage)),
        );
      }

      if (errorMessage.includes('invalid value')) {
        return Promise.reject(
          new RequestError(createInvalidVariableErrorPreset(errorMessage)),
        );
      }

      if (errorMessage.includes('Validation error')) {
        return Promise.reject(
          new RequestError(createValidationErrorPreset(errorMessage)),
        );
      }

      const customError = new RequestError(
        createErrorPreset({
          message: errorMessage,
          code: 'UNKNOWN_ERROR',
          status: graphQLError?.errors[0]?.status || 0,
          ...((errorMap && errorMap(graphQLError)) || {}),
        }),
      );
      return Promise.reject(customError);
    }
  }
}
