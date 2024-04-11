import {useCallback} from 'react';

import {
  useOnSuccessSignIn,
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordHidden,
} from 'core/hooks';
import {signInRequest} from 'core/reducers';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SignInPasswordScreenNavigationProps,
  SignInPasswordScreenRouteProps,
} from '../types';
import {useFormik} from 'formik';
import {IRequestError, SignInFormModel} from 'core/types';
import {validationSchema} from './validation';
import {useSnackbar} from 'atoms';

export const useSignInPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SignInPasswordScreenNavigationProps>();

  const {
    params: {email},
  } = useRoute<SignInPasswordScreenRouteProps>();

  const {onSuccessSignIn} = useOnSuccessSignIn();

  const navigateToRestorePassword = useCallback(() => {
    navigation.navigate('RestorePassword');
  }, [navigation]);

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
