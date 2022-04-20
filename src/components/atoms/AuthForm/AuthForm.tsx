import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {Button, Icon} from 'atoms';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslation('authentification');
  const buttonText = t('createButton').toUpperCase();

  return (
    <>
      <View style={styles.inputFieldContainer}>
        <Icon name={'email'} size={16} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputFieldContainer}>
        <Icon name={'avatar'} size={16} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder={t('userName')}
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View style={styles.inputFieldContainer}>
        <Icon name={'lock'} size={16} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder={t('password')}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.iconContainer}>
          <Icon name={'eye'} size={16} />
        </View>
      </View>

      <Button style={styles.button}>{buttonText}</Button>
    </>
  );
};
