import {useCallback, useEffect, useState} from 'react';
import {useOnRequestSuccess, useRequestLoading} from 'core/hooks';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {checkUserEmailRequest} from 'core/reducers';
import {CheckEmailScreenNavigationProps} from '../types';

export const useCheckEmail = () => {
  const navigation = useNavigation<CheckEmailScreenNavigationProps>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const {loading} = useRequestLoading(checkUserEmailRequest);

  useEffect(() => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (regexForEmail.test(email)) {
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  }, [email, setIsEmailCorrect]);

  const checkEmail = useCallback(() => {
    dispatch(checkUserEmailRequest(email));
  }, [dispatch, email]);

  useOnRequestSuccess(checkUserEmailRequest, data => {
    if (!data.exist) {
      navigation.navigate('SignUpForm', {email});
    } else if (data.exist) {
      if (data.isConfirmed) {
        navigation.navigate('SignInPassword', {email});
      } else {
        navigation.navigate('EmailValidation', {
          email,
          isSignUp: data.isPasswordReset ? false : true,
        });
      }
    }
  });

  return {
    email,
    isEmailCorrect,
    loading,
    setEmail,
    checkEmail,
  };
};
