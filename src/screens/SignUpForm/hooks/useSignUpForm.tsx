import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  useOnRequestError,
  useOnRequestSuccess,
  useRequestLoading,
  useTogglePasswordVisibility,
} from 'core/hooks';
import {
  SignUpFormScreenRouteProps,
  SignUpFormScreenNavigationProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {signUpRequest} from 'core/reducers';
import {useFormik} from 'formik';
import {SignUpFormModel} from 'core/types';
import {validationSchema} from './validation';
import {useSnackbar} from 'atoms';

export const useSignUpForm = () => {
  const dispatch = useDispatch();

  const {
    params: {email},
  } = useRoute<SignUpFormScreenRouteProps>();
  const navigation = useNavigation<SignUpFormScreenNavigationProps>();

  const navigateToEmailValidation = useCallback(() => {
    navigation.navigate('CodeVerification', {email, isSignUp: true});
  }, [email, navigation]);

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
  });

  const {loading} = useRequestLoading(signUpRequest);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

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
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    isSubmitButtonDisabled: !formik.values.password,
    submitForm: formik.handleSubmit,
    snackBarProps,
  };
};
