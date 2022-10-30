import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {useTogglePasswordVisibility} from 'core/hooks';
import {Button, FormInput} from 'atoms';

interface IProps {
  onSubmit: (data: {email: string; password: string}) => void;
  buttonText: string;
  loading?: boolean;
}

export const AuthForm = ({onSubmit, loading, buttonText}: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*  const [emailTip, setEmailTip] = useState('');
  const [passwordTip, setPasswordTip] = useState(''); */

  const onSubmitHandler = useCallback(() => {
    onSubmit({
      email,
      password,
    });
  }, [email, onSubmit, password]);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');

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

      <Button loading={loading} onPress={onSubmitHandler}>
        {buttonText}
      </Button>
    </>
  );
};
