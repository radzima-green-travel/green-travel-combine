import {type} from 'arktype';
import {FormFieldConfig} from './common';

export namespace NewPlaceForm {
  export const fieldConfigs: Record<string, FormFieldConfig> = {
    objectName: {
      maxLength: 100,
    },
    objectDescription: {
      maxLength: 1500,
      multiline: true,
    },
    objectWebsite: {
      maxLength: 150,
      keyboardType: 'url',
    },
    userEmail: {
      keyboardType: 'email-address',
    },
  };

  export const Schema = type({
    objectName: type('string.trim').pipe(type('string > 0')),
    objectDescription: 'string',
    objectWebsite: 'string',
    userEmail: type('string.trim').pipe(type('string.email | ""')),
  });

  export type Schema = typeof Schema.infer;

  export type FieldName = keyof Schema;

  export const empty = (): Schema => ({
    objectName: '',
    objectDescription: '',
    objectWebsite: '',
    userEmail: '',
  });
}

export const NewPlaceEmailRequest = type({
  objectName: 'string',
  objectDescription: 'string',
  objectWebsite: 'string',
  userEmail: 'string',
  userId: 'string | null',
}).pipe(input => {
  return {
    subject: `Request for adding a new object: ${input.objectName}`,
    message: `
      Name of attraction: ${input.objectName}
      Description: ${input.objectDescription}
      Link: ${input.objectWebsite}
      Sender Email: ${input.userEmail ?? "Email hasn't been shared by user"}
    `,
    userId: input.userId,
  };
});

export type AddNewObjectAnalyicsFields =
  | 'Object name'
  | 'Description'
  | 'Object website'
  | 'Email address';

export const AddNewObjectAnalyicsFieldsMap: Record<
  keyof NewPlaceForm.Schema,
  AddNewObjectAnalyicsFields
> = {
  objectName: 'Object name',
  objectDescription: 'Description',
  objectWebsite: 'Object website',
  userEmail: 'Email address',
};
