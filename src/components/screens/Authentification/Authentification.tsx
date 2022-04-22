import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';
import {AuthTabBar} from 'atoms';
import {SignUp, SignIn} from 'organisms';
// import {IProps} from './types';

export const Authentification = () => {
  const [isSignUp, setIsignUp] = useState(true);
  const {t} = useTranslation('authentification');

  const togleSignUp = () => {
    setIsignUp(!isSignUp);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AuthTabBar isSignUp={isSignUp} onPress={togleSignUp} />
        {isSignUp ? <SignUp /> : <SignIn />}
        <Text style={styles.warning}>{t('registrationWarning')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
