import React, {memo, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Image,
} from 'react-native';
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
      <Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{width, height: '100%'}}
        resizeMode="cover"
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
          <Image
            style={{width}}
            resizeMode="cover"
            source={{
              uri: item,
            }}
          />
        );
      }}
    />
  );
});
