import React from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
} from 'react-native';

import FastImage, {ImageStyle} from 'react-native-fast-image';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
}

export const ImageSlider = ({images, onScroll, width, height}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <FlatList
      contentContainerStyle={{height}}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      bounces={false}
      keyExtractor={(_item, index) => String(_item || index)}
      onScroll={onScroll}
      data={images}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      renderItem={({item}) => {
        console.log(item);
        return (
          <FastImage
            style={[styles.image as unknown as StyleProp<ImageStyle>, {width}]}
            resizeMode="cover"
            source={
              typeof item === 'string'
                ? {
                    uri: item,
                  }
                : item
            }
          />
        );
      }}
    />
  );
};
