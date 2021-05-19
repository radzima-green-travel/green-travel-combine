import React, {memo} from 'react';
import {FlatList, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
}

export const ImageSlider = memo(({images, onScroll, width, height}: IProps) => {
  return (
    <FlatList
      contentContainerStyle={{height}}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={128}
      bounces={false}
      keyExtractor={(_item, index) => String(_item || index)}
      onScroll={onScroll}
      data={images}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      renderItem={({item, index}) => {
        return (
          <FastImage
            style={{width}}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item,
              priority:
                index === 0 ? FastImage.priority.high : FastImage.priority.low,
            }}
          />
        );
      }}
    />
  );
});
