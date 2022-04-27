import React, {useState} from 'react';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';

interface IProps {
  isSignUp: boolean;
  onCreatePress: () => void;
}

export const AuthForm = ({isSignUp, onCreatePress}: IProps) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = isSignUp
    ? t('signUpButton').toUpperCase()
    : t('signInButton').toUpperCase();

  const onFormSubmit = () => {
    const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordMinLength = 8;

    // TODO: form input validation
    if (!regexForEmail.test(email)) {
      console.log('wrong email');
    }

    if (password.length < passwordMinLength) {
      console.log('password is too short');
    }
  };

  return (
    <>
      <FormInput
        iconLeftName={'email'}
        size={16}
        placeholder={'email'}
        value={email}
        setValue={setEmail}
        renderLeftIcon={true}
      />
      {isSignUp ? (
        <FormInput
          iconLeftName={'avatar'}
          size={16}
          placeholder={'userName'}
          value={userName}
          setValue={setUserName}
          renderLeftIcon={true}
        />
      ) : null}

      <FormInput
        iconRightName={rightIcon}
        iconLeftName={'lock'}
        size={16}
        placeholder={'password'}
        secureTextEntry={passwordVisibility}
        onRightIconPress={handlePasswordVisibility}
        value={password}
        setValue={setPassword}
        renderLeftIcon={true}
        renderRightIcon={true}
      />
      <Button style={styles.button} onPress={onCreatePress}>
        {buttonText}
      </Button>
    </>
  );
};
