import * as Yup from 'yup';
import {PASSWORD_REGEX, MIN_PASSWORD_LENGTH} from 'core/validation';

export const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(MIN_PASSWORD_LENGTH, 'Invalid password')
    .matches(PASSWORD_REGEX, 'Invalid password')
    .required('Invalid password'),
});
