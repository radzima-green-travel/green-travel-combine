import {useCallback} from 'react';

import {useDispatch} from 'react-redux';
import {
  confirmSignUpRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
} from 'core/reducers';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  EmailValidationScreenNavigationProps,
  EmailValidationScreenRouteProps,
} from '../types';
import {useFormik} from 'formik';
import {ValidationCodeFormModel} from 'core/types';
import {useSnackbar} from 'atoms';

export const useEmailValidation = () => {
  const {t} = useTranslation('authentification');
  const codeLength = 6;

  const navigation = useNavigation<EmailValidationScreenNavigationProps>();
  const {
    params: {email, isSignUp},
  } = useRoute<EmailValidationScreenRouteProps>();

  const dispatch = useDispatch();

  const onConfirmSignUp = useCallback(
    ({code}: {code: string}) => {
      if (isSignUp) {
        dispatch(confirmSignUpRequest({email, code}));
      } else {
        navigation.navigate('NewPassword', {email, code});
      }
    },
    [isSignUp, dispatch, email, navigation],
  );

  const formik = useFormik<ValidationCodeFormModel>({
    initialValues: {
      code: '',
    },
    onSubmit: onConfirmSignUp,
  });
  const {show, ...snackBarProps} = useSnackbar();

  const {loading} = useRequestLoading(confirmSignUpRequest);

  const onResendSignUpCodetoEmail = useCallback(() => {
    dispatch(resendSignUpCodeRequest(email));
  }, [dispatch, email]);

  const onResendRestorePasswordCodetoEmail = useCallback(() => {
    dispatch(forgotPasswordRequest({email}));
  }, [dispatch, email]);

  const buttonText = t('ready').toUpperCase();

  useOnRequestSuccess(confirmSignUpRequest, () => {
    navigation.getParent()?.goBack();
  });

  useOnRequestError(confirmSignUpRequest, 'authentification', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });
  useOnRequestError(resendSignUpCodeRequest, 'authentification', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  return {
    isSignUp,
    email,
    loading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    buttonText,

    formik,
    isSubmitButtonDisabled: formik.values.code.length !== codeLength,
    submitForm: formik.handleSubmit,
    snackBarProps,
    codeLength,
  };
};
