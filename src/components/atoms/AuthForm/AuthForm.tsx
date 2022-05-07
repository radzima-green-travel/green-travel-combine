import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';

interface IProps {
  isSignUpScreen: boolean;
  onPress: () => void;
}

export const AuthForm = ({isSignUpScreen, onPress}: IProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailTip, setEmailTip] = useState('');
  const [usernameTip, setUsernameTip] = useState('');
  const [passwordTip, setPasswordTip] = useState('');

  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = isSignUpScreen
    ? t('signUpButton').toUpperCase()
    : t('signInButton').toUpperCase();

  // TODO: form input validation at backend
  const onSignUpSubmit = () => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

    if (!username) {
      setUsernameTip(t('messageTips.emptyUserName'));
      isValidated = false;
    } else {
      setUsernameTip('');
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
  };

  const onSignInSubmit = () => {
    onPress();
  };

  return (
    <>
      <View style={styles.input}>
        <FormInput
          iconLeftName={'email'}
          size={16}
          placeholder={'email'}
          value={email}
          setValue={setEmail}
          dangerBorder={!!emailTip}
        />
        {emailTip ? <Text style={styles.textDanger}>{emailTip}</Text> : null}
      </View>

      {isSignUpScreen ? (
        <View style={styles.input}>
          <FormInput
            iconLeftName={'avatar'}
            size={16}
            placeholder={'userName'}
            value={username}
            setValue={setUsername}
            dangerBorder={!!usernameTip}
          />
          {usernameTip ? (
            <Text style={styles.textDanger}>{usernameTip}</Text>
          ) : null}
        </View>
      ) : null}

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
          dangerBorder={!!passwordTip}
        />
        {passwordTip ? (
          <Text style={styles.textDanger}>{passwordTip}</Text>
        ) : null}
      </View>

      <Button
        style={styles.button}
        onPress={isSignUpScreen ? onSignUpSubmit : onSignInSubmit}>
        {buttonText}
      </Button>
    </>
  );
};
