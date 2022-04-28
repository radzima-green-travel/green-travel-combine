import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import {Trans} from 'react-i18next';
import {useTranslation} from 'core/hooks';
import {AuthTabBar} from 'atoms';
import {AuthEmailValildation} from 'molecules';
import {SignUp, SignIn} from 'organisms';
// import {IProps} from './types';

export const Authentification = () => {
  const [isSignUp, setIsignUp] = useState(true);
  const [isEmailValidation, setIsEmailValidation] = useState(false);
  const {t} = useTranslation('authentification');

  const toggleSignUp = () => {
    setIsignUp(!isSignUp);
  };

  const toggleEmailValidation = () => {
    setIsEmailValidation(true);
  };

  // TODO: add actual links to Terms of Use and Privacy Policy
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AuthTabBar isSignUp={isSignUp} onPress={toggleSignUp} />
        {!isSignUp ? (
          <SignIn />
        ) : !isEmailValidation ? (
          <SignUp onCreatePress={toggleEmailValidation} />
        ) : (
          <AuthEmailValildation />
        )}
        <Text style={styles.warning}>
          <Trans
            t={t}
            components={{
              linkStyle: <Text style={styles.link} />,
            }}>
            registrationWarning
          </Trans>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
