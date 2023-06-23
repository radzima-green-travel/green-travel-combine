import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {
  useRequestLoading,
  useOnRequestSuccess,
  useTogglePasswordVisibility,
  useTranslation,
  useOnRequestError,
} from 'core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {confirmNewPasswordRequest} from 'core/reducers';
import {
  NewPasswordScreenNavigationProps,
  NewPasswordScreenRouteProps,
} from '../types';
import {useFormik} from 'formik';
import {SignInFormModel} from 'core/types';
import {validationSchema} from './validation';
import {useSnackbar} from 'atoms';

export const useNewPassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();
  const navigation = useNavigation<NewPasswordScreenNavigationProps>();
  const {
    params: {email, tempPassword},
  } = useRoute<NewPasswordScreenRouteProps>();

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

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();

  useOnRequestSuccess(confirmNewPasswordRequest, () => {
    navigation.getParent()?.goBack();
  });

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
    passwordVisibility,
    handlePasswordVisibility,
    isSubmitButtonDisabled: !formik.isValid || !formik.values.password,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
