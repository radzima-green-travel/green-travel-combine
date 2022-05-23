import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';
import {Auth} from 'aws-amplify';
import {IProps} from './types';

export const NewPassword = ({navigation}: IProps) => {
  const [password, setPassword] = useState('');
  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();

  const onConfirmNewPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>{t('newPassword')}</Text>
          <Text style={styles.text}>{t('passwordWarning')}</Text>
          <FormInput
            iconRightName={rightIcon}
            iconLeftName={'lock'}
            size={16}
            placeholder={'password'}
            secureTextEntry={passwordVisibility}
            onRightIconPress={handlePasswordVisibility}
            value={password}
            setValue={setPassword}
          />
        </View>
        <Button onPress={onConfirmNewPassword}>{buttonText}</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
