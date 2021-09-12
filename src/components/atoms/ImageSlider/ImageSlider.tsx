import {COLORS} from 'assets';
import React, {memo, useState} from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  StyleProp,
  Image,
  ImageStyle as NativeImageStyle,
} from 'react-native';

import * as Progress from 'react-native-progress';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {isIOS} from 'services/PlatformService';
interface IProps {
  images?: string[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
  height: number;
}

const Item = memo(({width, uri}: {width: number; uri: string}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={[styles.container, {width}]}>
      {isIOS ? (
        <FastImage
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={[styles.image as unknown as StyleProp<ImageStyle>, {width}]}
          onProgress={({nativeEvent}) => {
            const {loaded, total} = nativeEvent;
            console.log(loaded, total);
            setProgress(loaded / total);
          }}
          resizeMode="cover"
          source={{
            uri: uri,
          }}
        />
      ) : (
        <Image
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={[
            styles.image as unknown as StyleProp<NativeImageStyle>,
            {width},
          ]}
          onProgress={({nativeEvent}) => {
            const {loaded, total} = nativeEvent;
            console.log(loaded, total);
            setProgress(loaded / total);
          }}
          resizeMode="cover"
          source={{
            uri: uri,
          }}
        />
      )}

      {loading ? (
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={40}
            borderWidth={0}
            color={COLORS.forestGreen}
            progress={progress}
            thickness={1.5}
          />
        </View>
      ) : null}
    </View>
  );
});

export const ImageSlider = ({images, onScroll, width, height}: IProps) => {
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
        return <Item width={width} uri={item} />;
      }}
    />
  );
};
