import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useImagesGallery} from './hooks';
import Gallery, {RenderItemInfo} from 'react-native-awesome-gallery';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'expo-image';

export const ImagesGallery = memo(() => {
  const {
    images,
    initialIndex,
    closeGallery,
    setPage,
    currentPage,
    triggerHapticFeedback,
  } = useImagesGallery();

  const styles = useThemeStyles(themeStyles);
  const {top, bottom} = useSafeAreaInsets();

  const renderItem = ({item, setImageDimensions}: RenderItemInfo<string>) => {
    return (
      <Image
        source={item}
        style={StyleSheet.absoluteFillObject}
        contentFit="contain"
        onLoad={e => {
          const {width, height} = e.source;
          setImageDimensions({width, height});
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBarContainer, {paddingTop: top}]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{currentPage}</Text>
          <Text style={styles.text}>/</Text>
          <Text style={styles.text}>{images.length}</Text>
        </View>
      </View>
      <Gallery
        data={images}
        initialIndex={initialIndex}
        onSwipeToClose={closeGallery}
        onIndexChange={setPage}
        renderItem={renderItem}
        onScaleEnd={triggerHapticFeedback}
      />
      <View style={styles.bottomBarContainer}>
        <Pressable
          onPress={closeGallery}
          style={[styles.closeButtonContainer, {paddingBottom: bottom || 16}]}>
          <Icon name="close" size={24} style={styles.closeIcon} />
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
});
