import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  name: string;
  link: string;
  onPress: (link: string) => void;
  testID: string;
}

export const LinkItem = memo(({name, link, onPress, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      testID={testID}
      onPress={() => onPress(link)}>
      <Text style={styles.link}>{name}</Text>
    </TouchableOpacity>
  );
});
