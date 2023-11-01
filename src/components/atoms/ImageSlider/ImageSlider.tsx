import React from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageStyle,
  Pressable,
} from 'react-native';
import {Image} from 'expo-image';

import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {TestIDs} from 'core/types';
import {ZoomableView} from '../ZoomableViewGlobal';
interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
  imageTestID: TestIDs;
  activePage: number;
  onImagePress?: () => void;
}

export const ImageSlider = ({
  images,
  onScroll,
  width,
  height,
  imageTestID,
  activePage,
  onImagePress,
}: IProps) => {
  const activePageIndex = Math.max(0, activePage - 1);
  const styles = useThemeStyles(themeStyles);

  const renderItem = ({item, index}) => {
    const imageSourse =
      typeof item === 'string'
        ? {
            uri: item,
          }
        : item;

    return (
      <Pressable onPress={onImagePress}>
        <Image
          style={[styles.image as ImageStyle, {width}]}
          resizeMode="cover"
          source={imageSourse.uri}
          {...getPlatformsTestID(composeTestID(imageTestID, index))}
        />
      </Pressable>
    );
  };

  return (
    <ZoomableView
      position={{
        left: 0,
        top: 0,
      }}
      height={height}
      width={width}
      pushOnTopElement={renderItem({
        item: images?.[activePageIndex],
        index: activePageIndex,
      })}>
      <FlatList
        contentContainerStyle={{
          height,
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        // bounces={false}
        style={styles.container}
        keyExtractor={(_item, index) => String(_item || index)}
        onScroll={onScroll}
        data={images}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        renderItem={renderItem}
      />
    </ZoomableView>
  );
};
