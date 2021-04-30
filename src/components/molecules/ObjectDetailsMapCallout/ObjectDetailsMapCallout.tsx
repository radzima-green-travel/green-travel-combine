import React from 'react';
import {View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

export const ObjectDetailsMapCallout = () => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <View style={styles.content} />
      <View style={styles.sBubble} />
      <View style={styles.mBubble} />
    </View>
  );
};
