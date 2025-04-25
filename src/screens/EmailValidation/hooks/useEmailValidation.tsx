import {useCallback, useEffect} from 'react';
import {useSnackbar} from 'atoms';
import {
  confirmSignUpCancel,
  confirmSignUpRequest,
  forgotPasswordCodeSubmitRequest,
  forgotPasswordRequest,
  resendSignUpCodeRequest,
} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useOnSuccessSignIn,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {
  IRequestError,
  RouteQueryParams,
  ValidationCodeFormModel,
} from 'core/types';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';

export const useEmailValidation = () => {
  const {t} = useTranslation('authentification');
  const codeLength = 6;

  const router = useRouter();
  const searchParams =
    useLocalSearchParams<RouteQueryParams.CodeVerification>();

  const {email} = searchParams;

  const isSignUp = searchParams.isSignUp === 'true';

  const dispatch = useDispatch();

  const {onSuccessSignIn} = useOnSuccessSignIn();

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

  const buttonText = t('ready');

  useOnRequestSuccess(confirmSignUpRequest, onSuccessSignIn);

  useOnRequestSuccess(
    forgotPasswordCodeSubmitRequest,
    ({tempPassword}: {tempPassword: string}) => {
      router.replace({
        pathname: '/new-password',
        params: {email, tempPassword},
      });
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
