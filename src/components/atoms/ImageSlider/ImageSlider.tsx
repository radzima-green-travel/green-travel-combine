import React, {memo, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {LoadingView} from '../LoadingView';

interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
}

const Item = ({width, item}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{width}}>
      <FastImage
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{width, height: '100%'}}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: item,
        }}
      />
      {loading ? <LoadingView transparent /> : null}
    </View>
  );
};

export const ImageSlider = memo(({images, onScroll, width, height}: IProps) => {
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
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      renderItem={({item}) => {
        return (
          <FastImage
            style={{width}}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item,
            }}
          />
        );
      }}
    />
  );
});
