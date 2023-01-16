import * as Yup from 'yup';
import {
  MIN_PASSWORD_LENGTH,
  LOWER_CASE_REGEX,
  UPPER_CASE_REGEX,
  SPECIAL_CHAR_REGEX,
} from 'core/validation';

const validationErrorTranlsationKey = 'validation.password';

export const validationSchema = Yup.object({
  password: Yup.string()
    .min(MIN_PASSWORD_LENGTH, validationErrorTranlsationKey)
    .matches(LOWER_CASE_REGEX, validationErrorTranlsationKey)
    .matches(UPPER_CASE_REGEX, validationErrorTranlsationKey)
    .matches(SPECIAL_CHAR_REGEX, validationErrorTranlsationKey)
    .required(validationErrorTranlsationKey),
});
