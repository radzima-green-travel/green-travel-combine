import {useSnackbar} from 'atoms';
import {signUpRequest} from 'core/actions';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordHidden,
} from 'core/hooks';
import {RouteQueryParams, SignUpFormModel} from 'core/types';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useFormik} from 'formik';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {validationSchema} from './validation';

export const useSignUpForm = () => {
  const dispatch = useDispatch();

  const {email} = useLocalSearchParams<RouteQueryParams.SignUpForm>();
  const router = useRouter();

  const navigateToEmailValidation = useCallback(() => {
    router.replace({
      pathname: '/email-validation',
      params: {email, isSignUp: 'true'},
    });
  }, [email, router]);

  const signUp = useCallback(
    ({password}: SignUpFormModel) => {
      dispatch(signUpRequest({email, password}));
    },
    [dispatch, email],
  );

  const formik = useFormik<SignUpFormModel>({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
    validateOnMount: true,
  });

  const {loading} = useRequestLoading(signUpRequest);

  const {passwordHidden, rightIcon, handlePasswordHidden} =
    useTogglePasswordHidden();

  useOnRequestSuccess(signUpRequest, navigateToEmailValidation);

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestError(signUpRequest, 'authentification', errorLabel => {
    show({
      type: 'error',
      title: errorLabel.text,
    });
  });

  return {
    loading,
    email,
    formik,
    signUp,
    passwordHidden,
    rightIcon,
    handlePasswordHidden,
    isSubmitButtonDisabled: !formik.isValid,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
