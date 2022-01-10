import React, {memo, useCallback} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {IObject} from 'core/types';
import {DARK_ICONS_MATCHER, ICONS_MATCHER} from 'core/constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
interface IProps {
  data: IObject;
  onPress: (item: IObject) => void;
  onDeletePress: (item: IObject) => void;
}

export const SearchListItem = memo(({data, onPress, onDeletePress}: IProps) => {
  const {
    name,
    category: {icon, name: categoryName},
  } = data;

  const styles = useThemeStyles(themeStyles);
  const colorScheme = useColorScheme();

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  const onPressDeleteHandler = useCallback(() => {
    onDeletePress(data);
  }, [onDeletePress, data]);

  const renderRightAction = (progress, dragX) => {
    const transition = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [92, 192],
    });

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPressDeleteHandler}>
        <Animated.View
          style={[
            styles.rightDeleteActionBox,
            {
              transform: [{translateX: transition}],
            },
          ]}>
          <Icon name="delete" size={36} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableOpacity
        onPress={onPressHandler}
        activeOpacity={0.8}
        style={styles.container}>
        <Icon
          style={styles.icon}
          name={
            colorScheme === 'light'
              ? ICONS_MATCHER[icon]
              : DARK_ICONS_MATCHER[icon]
          }
          size={36}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{categoryName}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
});
