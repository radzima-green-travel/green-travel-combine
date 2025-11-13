import React, { memo, useCallback } from 'react';
import { ImageStyle, Text, TouchableOpacity, View } from 'react-native';
import { themeStyles } from './styles';
import { useThemeStyles } from 'core/hooks';
import { IBelongsTo } from 'core/types';
import { composeTestID, getPlatformsTestID } from 'core/helpers';
import { Image } from 'expo-image';

interface IProps {
  onPress: (item: IBelongsTo) => void;
  data: IBelongsTo;
  testID: string;
}

export const ObjectBelongsToItem = memo(({ data, onPress, testID }: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const { image, name, categoryName } = data;

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={styles.container}
      {...getPlatformsTestID(testID)}>
      <Image
        {...getPlatformsTestID(composeTestID(testID, 'image'))}
        style={styles.image as ImageStyle}
        source={{ uri: image }}
      />
      <View style={styles.textContainer}>
        <Text
          {...getPlatformsTestID(composeTestID(testID, 'title'))}
          numberOfLines={2}
          style={styles.title}>
          {name}
        </Text>
        <Text
          {...getPlatformsTestID(composeTestID(testID, 'subtitle'))}
          numberOfLines={1}
          style={styles.subtitle}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
