import React, {memo, useCallback} from 'react';
import {Text, View} from 'react-native';

import {Icon} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {SearchObject} from 'core/types';
import {DARK_ICONS_MATCHER, ICONS_MATCHER} from 'core/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: SearchObject;
  onPress: (item: SearchObject) => void;
  testID: string;
}

export const SearchListItem = memo(({data, testID, onPress}: IProps) => {
  const {
    name,
    category: {icon, name: categoryName},
  } = data;

  const styles = useThemeStyles(themeStyles);
  const colorScheme = useColorScheme();

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      activeOpacity={1}
      style={styles.container}
      {...getPlatformsTestID(testID)}>
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
        <Text
          style={styles.title}
          {...getPlatformsTestID(composeTestID(testID, 'title'))}>
          {name}
        </Text>
        <Text style={styles.subtitle}>{categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
});
