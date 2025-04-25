import {useSnackbar} from 'atoms';
import {forgotPasswordRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {ForgotPasswordEmailFormModel} from 'core/types';
import {useRouter} from 'expo-router';
import {useFormik} from 'formik';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {validationSchema} from './validation';

export const useRestorePassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();

  const router = useRouter();

  const onResendPassword = useCallback(
    ({email}: ForgotPasswordEmailFormModel) => {
      dispatch(forgotPasswordRequest({email}));
    },
    [dispatch],
  );

  const formik = useFormik<ForgotPasswordEmailFormModel>({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: onResendPassword,
  });

  const {loading} = useRequestLoading(forgotPasswordRequest);

  useOnRequestSuccess(forgotPasswordRequest, () => {
    router.navigate({
      pathname: '/email-validation',
      params: {
        email: formik.values.email,
        isSignUp: 'false',
      },
    });
  });

  const buttonText = t('send');

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestError(forgotPasswordRequest, 'authentification', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  return {
    loading,
    navigateToSignIn: router.dismissAll,
    buttonText,
    formik,
    isSubmitButtonDisabled: !formik.values.email,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
