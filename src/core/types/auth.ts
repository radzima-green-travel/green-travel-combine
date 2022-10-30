import {CognitoUser} from 'amazon-cognito-identity-js';

export type CognitoUserAttributes = {
  email: string;
  email_verified: boolean;
};
export type CognitoUserWithAttributes = CognitoUser & {
  attributes: CognitoUserAttributes;
};
