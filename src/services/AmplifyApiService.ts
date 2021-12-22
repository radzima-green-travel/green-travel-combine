import {NetworkError} from 'core/errors';

import Amplify, {API, graphqlOperation} from 'aws-amplify';
import {GraphQLResult} from '@aws-amplify/api';
import {some} from 'lodash';

export class AmplifyApiService {
  protected handleErrors(error: GraphQLResult) {
    const {errors} = error;

    const originalError = errors?.[0]?.originalError;
    if (
      some(['timeout', 'Network Error'], errorSubstring =>
        originalError?.message.includes(errorSubstring),
      )
    ) {
      throw new NetworkError();
    } else {
      throw error;
    }
  }

  public init(config?: any) {
    Amplify.configure({
      ...config,
      aws_appsync_authenticationType: 'API_KEY',
    });
  }

  public async query<T = object>(
    query: any,
    variables?: {} | undefined,
    authToken?: string | undefined,
  ) {
    try {
      const {data} = (await API.graphql(
        graphqlOperation(query, variables, authToken),
      )) as GraphQLResult<T>;

      return data!;
    } catch (e) {
      this.handleErrors(e as GraphQLResult);
    }
  }
}

export const amplifyApiService = new AmplifyApiService();
