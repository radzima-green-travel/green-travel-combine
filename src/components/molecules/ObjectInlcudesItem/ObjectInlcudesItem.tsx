import React, {memo, useCallback} from 'react';
import {ImageStyle, Text, TouchableOpacity} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IInclude} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {Image} from 'expo-image';

interface IProps {
  onPress: (config: {id: string; name: string; objects: string[]}) => void;
  data: IInclude;
  testID: string;
}

export const ObjectInlcudesItem = memo(({data, onPress, testID}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const {image, name, objects, categoryId} = data;

  const onPressHandler = useCallback(() => {
    onPress({id: categoryId, objects, name});
  }, [onPress, categoryId, objects, name]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.container}
      {...getPlatformsTestID(testID)}>
      <Image
        {...getPlatformsTestID(composeTestID(testID, 'image'))}
        style={styles.image as ImageStyle}
        source={{uri: image}}
      />
      <Text
        numberOfLines={2}
        {...getPlatformsTestID(composeTestID(testID, 'name'))}
        style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  );
});
