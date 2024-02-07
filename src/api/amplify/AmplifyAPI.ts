import {
  AmplifyError,
  CognitoUserWithAttributes,
  GetFavoritesResponse,
  UpdateFavoritesBody,
  BulkUpdateFavoritesBody,
  GetVisitedObjectsResponse,
  AddVisitedObjectBody,
} from 'core/types';
import {Auth} from 'aws-amplify';
import {AmplifyApiEngine, CustomApiRequestConfig} from '../engines';

class AmplifyApi extends AmplifyApiEngine {
  async getHeaders(config?: CustomApiRequestConfig) {
    const {headers} = config || {};
    let authHeaders = {};

    try {
      const session = await Auth.currentSession();
      authHeaders = {
        Authorization: session.getAccessToken().getJwtToken(),
      };
    } catch (e) {}

    return {
      ...authHeaders,
      ...(headers || {}),
    };
  }

  signIn = async (
    ...args: Parameters<typeof Auth.signIn>
  ): Promise<CognitoUserWithAttributes> => {
    const user = await this.invoke(
      {
        context: Auth,
        method: Auth.signIn,
        errorMap: (e: AmplifyError) => {
          if (e.code === 'PasswordResetRequiredException') {
            return {
              code: 'PASSWORD_RESET_REQUIRED',
              status: 400,
            };
          }
          if (e.code === 'UserNotConfirmedException') {
            return {
              code: 'USER_NOT_CONFIRMED',
              status: 400,
            };
          }
          if (e.code === 'NotAuthorizedException') {
            if (e.message === 'Password attempts exceeded') {
              return {
                code: 'PASSWORD_ATTEMPTS_EXCEEDED',
                status: 400,
              };
            }

            return {
              code: 'NOT_AUTHORIZED',
              status: 400,
            };
          }
          if (e.code === 'UserNotFoundException') {
            return {
              code: 'USER_NOT_FOUND',
              status: 400,
            };
          }

          return {};
        },
      },
      ...args,
    );
    return user;
  };

  forgotPasswordSubmit = async (
    ...args: Parameters<typeof Auth.forgotPasswordSubmit>
  ) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.forgotPasswordSubmit,
        errorMap: (e: AmplifyError) => {
          if (e.code === 'CodeMismatchException') {
            return {
              code: 'VERIFICATION_CODE_MISMATCH',
              status: 400,
            };
          }
          if (e.code === 'LimitExceededException') {
            return {
              code: 'VERIFICATION_CODE_CONFIRMATION_ATTEMPTS_EXCEEDED',
              status: 400,
            };
          }
          return {};
        },
      },
      ...args,
    );
  };

  forgotPassword = async (...args: Parameters<typeof Auth.forgotPassword>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.forgotPassword,
        errorMap: (e: AmplifyError) => {
          if (e.code === 'UserNotFoundException') {
            return {
              code: 'USER_TO_RESTORE_NOT_FOUND',
              status: 400,
            };
          }
          return {};
        },
      },
      ...args,
    );
  };

  confirmSignUp = async (...args: Parameters<typeof Auth.confirmSignUp>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.confirmSignUp,
        errorMap: (e: AmplifyError) => {
          if (e.code === 'CodeMismatchException') {
            return {
              code: 'VERIFICATION_CODE_MISMATCH',
              status: 400,
            };
          }
          return {};
        },
      },
      ...args,
    );
  };

  resendSignUp = async (...args: Parameters<typeof Auth.resendSignUp>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.resendSignUp,
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };
  deleteUser = async (...args: Parameters<typeof Auth.deleteUser>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.deleteUser,
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };

  signOut = async (...args: Parameters<typeof Auth.signOut>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.signOut,
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };

  changePassword = async (...args: Parameters<typeof Auth.changePassword>) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.changePassword,
        errorMap: (e: AmplifyError) => {
          if (e.code === 'NotAuthorizedException') {
            if (e.message === 'Incorrect username or password.') {
              return {
                code: 'WRONG_PASSWORD',
                status: 400,
              };
            }
          }

          if (e.code === 'LimitExceededException') {
            return {
              code: 'PASSWORD_ATTEMPTS_EXCEEDED',
              status: 400,
            };
          }
          return {};
        },
      },
      ...args,
    );
  };

  currentAuthenticatedUser = async (
    ...args: Parameters<typeof Auth.currentAuthenticatedUser>
  ) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.currentAuthenticatedUser,
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };

  federatedSignIn = async (
    ...args: Parameters<typeof Auth.federatedSignIn>
  ) => {
    return this.invoke(
      {
        context: Auth,
        method: Auth.federatedSignIn,
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };

  getUserFavorites = async (): Promise<GetFavoritesResponse> => {
    return this.getByApi('apiac472374', '/bookmark');
  };

  updateUserFavorites = async ({
    objectId,
    data,
  }: {
    objectId: string;
    data: UpdateFavoritesBody;
  }) => {
    return this.postByApi('apiac472374', `/bookmark/${objectId}`, {body: data});
  };

  bulkUpdateUserFavorites = async (data: BulkUpdateFavoritesBody) => {
    return this.postByApi('apiac472374', '/bookmark', {body: data});
  };

  getUserVisitedObjects = async (): Promise<GetVisitedObjectsResponse> => {
    return this.getByApi('apiac472374', '/visited-objects');
  };

  addUserVisitedObject = async ({
    objectId,
    data,
  }: {
    objectId: string;
    data: AddVisitedObjectBody;
  }) => {
    return this.postByApi('apiac472374', `/visited-objects/${objectId}`, {
      body: data,
    });
  };

  deleteUserVisitedObject = async ({objectId}: {objectId: string}) => {
    return this.deleteByApi('apiac472374', `/visited-objects/${objectId}`);
  };
  sendEmail = async ({
    message,
    subject,
    objectId,
  }: {
    message: string;
    subject: string;
    objectId: string;
  }) => {
    return this.postByApi('apiac472374', '/send', {
      body: {
        message,
        subject,
        objectId,
      },
    });
  };
}

export const amplifyApi = new AmplifyApi();
