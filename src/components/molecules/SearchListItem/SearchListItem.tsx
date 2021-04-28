import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IObject} from 'core/types';
import {ICONS_MATCHER} from 'core/constants';

interface IProps {
  data: IObject;
  onPress: (item: IObject) => void;
}

export const SearchListItem = memo(({data, onPress}: IProps) => {
  const {
    name,
    category: {icon, name: categoryName},
  } = data;
  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  const styles = useThemeStyles(themeStyles);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={0.8}
      style={styles.container}>
      <Icon style={styles.icon} name={ICONS_MATCHER[icon]} size={36} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
});
