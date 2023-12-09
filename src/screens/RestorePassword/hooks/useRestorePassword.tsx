import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useOnRequestError, useRequestLoading, useTranslation} from 'core/hooks';
import {useNavigation} from '@react-navigation/native';
import {forgotPasswordRequest} from 'core/reducers';
import {useOnRequestSuccess} from 'core/hooks';
import {RestorePasswordScreenNavigationProps} from '../types';
import {useFormik} from 'formik';
import {ForgotPasswordEmailFormModel} from 'core/types';
import {validationSchema} from './validation';
import {useSnackbar} from 'atoms';

export const useRestorePassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();

  const navigation = useNavigation<RestorePasswordScreenNavigationProps>();

  const navigateToSignIn = () => {
    navigation.popToTop();
  };

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
    navigation.navigate('EmailValidation', {
      email: formik.values.email,
      isSignUp: false,
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
    navigateToSignIn,
    buttonText,
    formik,
    isSubmitButtonDisabled: !formik.values.email,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
