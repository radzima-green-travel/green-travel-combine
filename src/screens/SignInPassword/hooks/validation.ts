import * as Yup from 'yup';

const validationErrorTranlsationKey = 'validation.emptyPassword';

export const validationSchema = Yup.object({
  password: Yup.string().required(validationErrorTranlsationKey),
});
