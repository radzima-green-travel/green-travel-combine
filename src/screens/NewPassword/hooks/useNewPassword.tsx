import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {useSnackbar} from 'atoms';
import {confirmNewPasswordRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useOnSuccessSignIn,
  useRequestLoading,
  useTogglePasswordHidden,
  useTranslation,
} from 'core/hooks';
import {RouteQueryParams, SignInFormModel} from 'core/types';
import {useLocalSearchParams} from 'expo-router';
import {useFormik} from 'formik';
import {validationSchema} from './validation';

export const useNewPassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();

  const {email, tempPassword} =
    useLocalSearchParams<RouteQueryParams.NewPassword>();

  const {onSuccessSignIn} = useOnSuccessSignIn();

  const confirmNewPassword = useCallback(
    ({password}: SignInFormModel) => {
      dispatch(
        confirmNewPasswordRequest({email, tempPassword, newPassword: password}),
      );
    },
    [dispatch, email, tempPassword],
  );

  const formik = useFormik<SignInFormModel>({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: confirmNewPassword,
  });

  const {loading} = useRequestLoading(confirmNewPasswordRequest);

  const {show, ...snackBarProps} = useSnackbar();

  const {passwordHidden, rightIcon, handlePasswordHidden} =
    useTogglePasswordHidden();
  const buttonText = t('save').toUpperCase();

  useOnRequestSuccess(confirmNewPasswordRequest, onSuccessSignIn);

  useOnRequestError(
    confirmNewPasswordRequest,
    'authentification',
    errorLabel => {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  return {
    formik,
    loading,
    buttonText,
    rightIcon,
    passwordHidden,
    handlePasswordHidden,
    isSubmitButtonDisabled: !formik.isValid || !formik.values.password,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
