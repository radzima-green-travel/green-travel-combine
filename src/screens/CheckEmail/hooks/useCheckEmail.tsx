import { useCallback } from 'react';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useOnRequestError,
} from 'core/hooks';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { checkUserEmailRequest } from 'core/actions';
import { CheckEmailScreenNavigationProps } from '../types';
import { useSnackbar } from 'atoms';
import { useFormik } from 'formik';
import { CheckEmailFormModel } from 'core/types';
import { validationSchema } from './validation';

export const useCheckEmail = () => {
  const navigation = useNavigation<CheckEmailScreenNavigationProps>();
  const dispatch = useDispatch();

  const { loading } = useRequestLoading(checkUserEmailRequest);

  const checkEmail = useCallback(
    ({ email }: CheckEmailFormModel) => {
      dispatch(checkUserEmailRequest(email));
    },
    [dispatch],
  );

  const formik = useFormik<CheckEmailFormModel>({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: checkEmail,
    validateOnBlur: false,
  });

  const { values } = formik;

  useOnRequestSuccess(checkUserEmailRequest, data => {
    if (!data.exist) {
      navigation.navigate('SignUpForm', { email: values.email });
    } else if (data.exist) {
      if (data.isConfirmed) {
        navigation.navigate('SignInPassword', { email: values.email });
      } else {
        navigation.navigate('EmailValidation', {
          email: values.email,
          isSignUp: data.isPasswordReset ? false : true,
        });
      }
    }
  });

  const { show, ...snackBarProps } = useSnackbar();

  useOnRequestError(checkUserEmailRequest, 'authentification', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  return {
    loading,
    checkEmail,
    snackBarProps,
    formik,
    isSubmitButtonDisabled: !formik.values.email,
    submitForm: formik.handleSubmit,
  };
};
