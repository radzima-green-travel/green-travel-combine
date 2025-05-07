import {useCallback} from 'react';
import {useSnackbar} from 'atoms';
import {signInRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useOnSuccessSignIn,
  useRequestLoading,
  useTogglePasswordHidden,
} from 'core/hooks';
import {IRequestError, RouteQueryParams, SignInFormModel} from 'core/types';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {validationSchema} from './validation';

export const useSignInPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {email} = useLocalSearchParams<RouteQueryParams.SignInPassword>();

  const {onSuccessSignIn} = useOnSuccessSignIn();

  const navigateToRestorePassword = useCallback(() => {
    router.navigate('/restore-password');
  }, [router]);

  const signIn = useCallback(
    ({password}: SignInFormModel) => {
      dispatch(signInRequest({email, password}));
    },
    [dispatch, email],
  );

  const formik = useFormik<SignInFormModel>({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: signIn,
  });

  const {loading} = useRequestLoading(signInRequest);

  const {passwordHidden, rightIcon, handlePasswordHidden} =
    useTogglePasswordHidden();

  useOnRequestSuccess(signInRequest, onSuccessSignIn);

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestError(signInRequest, 'authentification', errorLabel => {
    if (
      (errorLabel.originalError as IRequestError).status === 400 &&
      ['NOT_AUTHORIZED', 'PASSWORD_ATTEMPTS_EXCEEDED'].includes(
        (errorLabel.originalError as IRequestError).error_code,
      )
    ) {
      formik.setFieldError('password', errorLabel.text);
    } else {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    }
  });

  return {
    email,
    signIn,
    loading,
    navigateToRestorePassword,
    formik,
    passwordHidden,
    rightIcon,
    handlePasswordHidden,
    isSubmitButtonDisabled: !formik.values.password,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
