import * as Yup from 'yup';
import { EMAIL_VALIDATE_REGEX } from 'core/validation';

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('validation.emptyEmail')
    .matches(EMAIL_VALIDATE_REGEX, {
      excludeEmptyString: true,
      message: 'validation.invalidEmail',
    }),
});
