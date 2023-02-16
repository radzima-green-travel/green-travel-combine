import React, {useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
} from 'react-native';
import {Image} from 'expo-image';

import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
  defaultPhoto?: number;
}

export const ImageSlider = ({
  images,
  onScroll,
  width,
  height,
  defaultPhoto,
}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  const [isImgDownloaded, setIsImgDownloaded] = useState(true);

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
        const imageSourse =
          typeof item === 'string'
            ? {
                uri: item,
              }
            : item;

        return (
          <Image
            style={[styles.image as unknown as StyleProp<ImageStyle>, {width}]}
            resizeMode="cover"
            source={imageSourse.uri}
            onError={() => setIsImgDownloaded(false)}
          />
        );
      }}
    />
  );
};
