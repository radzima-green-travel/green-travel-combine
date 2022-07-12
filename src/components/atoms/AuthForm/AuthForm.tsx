import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';
import {signInRequest, signUpRequest} from 'core/reducers';

interface IProps {
  isSignUpScreen: boolean;
  onPress?: (email: string) => void;
}

export const AuthForm = ({isSignUpScreen, onPress}: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*  const [emailTip, setEmailTip] = useState('');
  const [passwordTip, setPasswordTip] = useState(''); */

  const dispatch = useDispatch();

  const onSignUpSubmit = useCallback(() => {
    dispatch(
      signUpRequest({
        username: email,
        password,
        attributes: {name: email, family_name: email},
      }),
    );

    onPress!(email);
  }, [dispatch, email, onPress, password]);

  const onSignInSubmit = useCallback(() => {
    dispatch(signInRequest({email, password}));
  }, [dispatch, email, password]);

  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = isSignUpScreen
    ? t('signUpButton').toUpperCase()
    : t('signInButton').toUpperCase();

  /* const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordMinLength = 8;
    let isValidated = true;

    if (!email) {
      setEmailTip(t('messageTips.emptyEmail'));
      isValidated = false;
    } else if (!regexForEmail.test(email)) {
      setEmailTip(t('messageTips.wrongEmail'));
      isValidated = false;
    } else {
      setEmailTip('');
    }

    if (!password || password.length < passwordMinLength) {
      setPasswordTip(t('messageTips.emptyPassword'));
      isValidated = false;
    } else {
      setPasswordTip('');
    }

    if (isValidated) {
      onPress();
    }
  }; */

  return (
    <>
      <View style={styles.input}>
        <FormInput
          iconLeftName={'email'}
          size={16}
          placeholder={'email'}
          value={email}
          setValue={setEmail}
          // dangerBorder={!!emailTip}
        />
        {/*  {emailTip ? <Text style={styles.textDanger}>{emailTip}</Text> : null} */}
      </View>

      <View style={styles.input}>
        <FormInput
          iconRightName={rightIcon}
          iconLeftName={'lock'}
          size={16}
          placeholder={'password'}
          secureTextEntry={passwordVisibility}
          onRightIconPress={handlePasswordVisibility}
          value={password}
          setValue={setPassword}
          // dangerBorder={!!passwordTip}
        />
        {/* {passwordTip ? (
          <Text style={styles.textDanger}>{passwordTip}</Text>
        ) : null} */}
      </View>

      <Button onPress={isSignUpScreen ? onSignUpSubmit : onSignInSubmit}>
        {buttonText}
      </Button>
    </>
  );
};
