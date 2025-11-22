import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordHidden,
} from 'core/hooks';
import { SignUpFormScreenNavigationProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import { changePasswordRequest } from 'core/actions';
import { useFormik } from 'formik';
import { ChangePasswordFormModel, IRequestError } from 'core/types';
import { validationSchema } from './validation';
import { useSnackbar } from 'atoms';

export const useChangePassword = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<SignUpFormScreenNavigationProps>();

  const navigateToEmailValidation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const signUp = useCallback(
    ({ oldPassword, newPassword }: ChangePasswordFormModel) => {
      dispatch(changePasswordRequest({ newPassword, oldPassword }));
    },
    [dispatch],
  );

  const formik = useFormik<ChangePasswordFormModel>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
    validateOnMount: true,
  });

  const { loading } = useRequestLoading(changePasswordRequest);

  const oldPasswordHidden = useTogglePasswordHidden();

  const newPasswordHidden = useTogglePasswordHidden();

  useOnRequestSuccess(changePasswordRequest, navigateToEmailValidation);

  const { show, ...snackBarProps } = useSnackbar();

  useOnRequestError(changePasswordRequest, 'authentification', errorLabel => {
    if (
      (errorLabel.originalError as IRequestError).status === 400
      && ['WRONG_PASSWORD', 'PASSWORD_ATTEMPTS_EXCEEDED'].includes(
        (errorLabel.originalError as IRequestError).error_code,
      )
    ) {
      formik.setFieldError('oldPassword', errorLabel.text);
    } else {
      show({
        type: 'error',
        title: errorLabel.text,
      });
    }
  });

  return {
    loading,
    formik,
    signUp,
    oldPasswordHidden,
    newPasswordHidden,
    isSubmitButtonDisabled: !formik.isValid || !formik.values.oldPassword,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
