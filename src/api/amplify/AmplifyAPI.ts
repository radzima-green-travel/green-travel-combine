import {AmplifyError, CognitoUserWithAttributes} from 'core/types';
import {Auth} from 'aws-amplify';
import {AmplifyApiEngine} from '../engines';

class AmplifyApi extends AmplifyApiEngine {
  signIn = async (
    ...args: Parameters<typeof Auth.signIn>
  ): Promise<CognitoUserWithAttributes> => {
    const user = await this.invoke(
      {
        context: Auth,
        method: Auth.signIn,
        errorMap: (e: AmplifyError) => {
          console.log(e);
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
        errorMap: () => {
          return {};
        },
      },
      ...args,
    );
  };
}

export const amplifyApi = new AmplifyApi();
