import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'core/hooks';

interface IProp {
  isSignUp: boolean;
  onPress: () => void;
}

export const AuthTabBar = ({isSignUp, onPress}: IProp) => {
  const {t} = useTranslation('authentification');

  return (
    <View style={styles.tabContainer}>
      <Pressable
        style={[styles.tab, isSignUp ? {} : styles.activeTab]}
        onPress={isSignUp ? onPress : null}>
        <Text style={isSignUp ? styles.tabText : styles.activeTabText}>
          {t('signInTab')}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tab, isSignUp ? styles.activeTab : {}]}
        onPress={isSignUp ? null : onPress}>
        <Text style={isSignUp ? styles.activeTabText : styles.tabText}>
          {t('signUpTab')}
        </Text>
      </Pressable>
    </View>
  );
};
