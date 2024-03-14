import React, {memo} from 'react';
import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  name: string;
  link: string;
  onPress: (link: string) => void;
  testID: string;
  style?: StyleProp<ViewStyle>;
}

export const LinkItem = memo(({name, link, onPress, testID, style}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.8}
      testID={testID}
      onPress={() => onPress(link)}>
      <Text style={styles.link}>{name}</Text>
    </TouchableOpacity>
  );
});
