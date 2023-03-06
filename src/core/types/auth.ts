import {CognitoUser} from 'amazon-cognito-identity-js';
export type CognitoUserAttributes = {
  email: string;
  email_verified: boolean;
  identities?: string;
  family_name?: string;
  name?: string;
};
export type CognitoUserWithAttributes = CognitoUser & {
  attributes: CognitoUserAttributes;
};

export type AmplifyError = {
  message: string;
  code: string;
};
