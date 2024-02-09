import {CognitoUser} from 'amazon-cognito-identity-js';
export type CognitoUserAttributes = {
  email: string;
  email_verified: boolean;
  identities?: string;
  family_name?: string;
  name?: string;
  sub?: string;
};
export type CognitoUserWithAttributes = CognitoUser & {
  attributes: CognitoUserAttributes;
  username: string;
};

export type AmplifyError = {
  message: string;
  code: string;
};
