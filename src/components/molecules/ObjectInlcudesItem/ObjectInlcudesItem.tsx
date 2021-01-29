import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';
import {ICONS_MATCHER} from './constants';
import {IInclude} from 'core/types';

interface IProps {
  onPress: (config: {_id: string; name: string; objects: string[]}) => void;
  data: IInclude;
}

export const ObjectInlcudesItem = memo(({data, onPress}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {icon, name, objects, _id} = data;
  const iconName = ICONS_MATCHER[icon];

  const onPressHandler = useCallback(() => {
    onPress({_id: _id, objects, name});
  }, [objects, _id, onPress, name]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.container}>
      <Icon width={44} height={44} name={iconName} />
      <Text style={styles.text}>{name}</Text>
      <Icon color={COLORS.logCabin} width={6} height={12} name="chevronRight" />
    </TouchableOpacity>
  );
});
