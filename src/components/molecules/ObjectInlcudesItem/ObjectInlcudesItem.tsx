import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles} from 'core/hooks';
import {ICONS_MATCHER, DARK_ICONS_MATCHER} from 'core/constants';
import {IInclude} from 'core/types';
import {getPlatformsTestID} from 'core/helpers';

interface IProps {
  onPress: (config: {id: string; name: string; objects: string[]}) => void;
  data: IInclude;
  testID: string;
}

export const ObjectInlcudesItem = memo(({data, onPress, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const theme = useColorScheme();
  const {icon, name, objects, id} = data;
  const iconName =
    theme === 'light' ? ICONS_MATCHER[icon] : DARK_ICONS_MATCHER[icon];

  const onPressHandler = useCallback(() => {
    onPress({id: id, objects, name});
  }, [objects, id, onPress, name]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.container}
      {...getPlatformsTestID(testID)}>
      <Icon size={32} name={iconName} />
      <Text style={styles.text}>{name}</Text>
      <Icon style={styles.icon} size={24} name="chevronRight" />
    </TouchableOpacity>
  );
});
