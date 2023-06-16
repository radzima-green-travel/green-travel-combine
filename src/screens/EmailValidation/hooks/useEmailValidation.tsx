import {useCallback, useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {
  confirmSignUpRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
  forgotPasswordCodeSubmitRequest,
  confirmSignUpCancel,
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
import {IRequestError, ValidationCodeFormModel} from 'core/types';
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
        dispatch(forgotPasswordCodeSubmitRequest({email, code}));
      }
    },
    [isSignUp, dispatch, email],
  );

  const formik = useFormik<ValidationCodeFormModel>({
    initialValues: {
      code: '',
    },
    onSubmit: onConfirmSignUp,
  });
  const {show, ...snackBarProps} = useSnackbar();

  const {loading} = useRequestLoading(confirmSignUpRequest);
  const {loading: forgotPasswordCodeSumbitLoading} = useRequestLoading(
    forgotPasswordCodeSubmitRequest,
  );

  const {loading: resendSignUpCodeLoading} = useRequestLoading(
    resendSignUpCodeRequest,
  );

  const {loading: resendRestorePasswordCodeLoading} = useRequestLoading(
    forgotPasswordRequest,
  );

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

  useOnRequestSuccess(
    forgotPasswordCodeSubmitRequest,
    ({tempPassword}: {tempPassword: string}) => {
      navigation.navigate('NewPassword', {email, tempPassword});
    },
  );

  useOnRequestError(
    forgotPasswordCodeSubmitRequest,
    'authentification',
    errorLabel => {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  useEffect(() => {
    return () => {
      dispatch(confirmSignUpCancel());
    };
  }, [dispatch]);

  useOnRequestError(confirmSignUpRequest, 'authentification', errorLabel => {
    if (
      (errorLabel.originalError as IRequestError).error_code !==
      'SIGNUP_CANCELED'
    ) {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    }
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
    loading: loading || forgotPasswordCodeSumbitLoading,
    onResendSignUpCodetoEmail,
    onResendRestorePasswordCodetoEmail,
    buttonText,

    formik,
    isSubmitButtonDisabled: formik.values.code.length !== codeLength,
    submitForm: formik.handleSubmit,
    snackBarProps,
    codeLength,
    seconadaryLoading:
      resendSignUpCodeLoading || resendRestorePasswordCodeLoading,
  };
};
