import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Text} from 'react-native';
import {themeStyles} from './styles';

interface IProps {
  text: string;
}

export const SettingsSectionTitle = memo(({text}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return <Text style={styles.text}>{text}</Text>;
});
