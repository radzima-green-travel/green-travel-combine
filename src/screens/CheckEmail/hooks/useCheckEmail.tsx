import {useSnackbar} from 'atoms';
import {checkUserEmailRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
} from 'core/hooks';
import {CheckEmailFormModel} from 'core/types';
import {useRouter} from 'expo-router';
import {useFormik} from 'formik';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {validationSchema} from './validation';

export const useCheckEmail = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();

  const {loading} = useRequestLoading(checkUserEmailRequest);

  const checkEmail = useCallback(
    ({email}: CheckEmailFormModel) => {
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

  const {values} = formik;

  useOnRequestSuccess(checkUserEmailRequest, data => {
    if (!data.exist) {
      navigation.navigate(`/sign-up?email=${values.email}`);
    } else if (data.exist) {
      if (data.isConfirmed) {
        navigation.navigate(`/password?email=${values.email}`);
      } else {
        navigation.navigate({
          pathname: '/email-validation',
          params: {
            email: values.email,
            isSignUp: data.isPasswordReset ? 'false' : 'true',
          },
        });
      }
    }
  });

  const {show, ...snackBarProps} = useSnackbar();

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
