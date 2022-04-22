import React, {useState} from 'react';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('createButton').toUpperCase();

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
      <FormInput
        iconLeftName={'avatar'}
        size={16}
        placeholder={'userName'}
        value={userName}
        setValue={setUserName}
        renderLeftIcon={true}
      />
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
      <Button style={styles.button}>{buttonText}</Button>
    </>
  );
};
