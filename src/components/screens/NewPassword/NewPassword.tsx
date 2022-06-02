import React, {useCallback, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {confirmNewPasswordRequest} from 'core/reducers';
import {styles} from './styles';
import {useTogglePasswordVisibility, useTranslation} from 'core/hooks';
import {Button, FormInput} from 'atoms';
import {IProps} from './types';

export const NewPassword = ({navigation, route}: IProps) => {
  const [newPassword, setNewPassword] = useState('');
  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();

  const dispatch = useDispatch();

  const {
    params: {email, code},
  } = route;

  const onConfirmNewPassword = useCallback(() => {
    dispatch(confirmNewPasswordRequest({email, code, newPassword}));
    navigation.navigate('TabAuthNavigator', {screen: 'SignIn'});
  }, [code, dispatch, email, navigation, newPassword]);

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
            value={newPassword}
            setValue={setNewPassword}
          />
        </View>
        <Button onPress={onConfirmNewPassword}>{buttonText}</Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
