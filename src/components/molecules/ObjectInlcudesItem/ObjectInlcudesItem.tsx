import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';
import {ICONS_MATCHER, DARK_ICONS_MATCHER} from 'core/constants';
import {IInclude} from 'core/types';

interface IProps {
  onPress: (config: {id: string; name: string; objects: string[]}) => void;
  data: IInclude;
}

export const ObjectInlcudesItem = memo(({data, onPress}: IProps) => {
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
      style={styles.container}>
      <Icon width={44} height={44} name={iconName} />
      <Text style={styles.text}>{name}</Text>
      <Icon
        style={styles.icon}
        color={COLORS.logCabin}
        width={6}
        height={12}
        name="chevronRight"
      />
    </TouchableOpacity>
  );
});
