import React, {memo, useMemo, useState} from 'react';
import {View, Image, useWindowDimensions} from 'react-native';
import {styles} from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface Props {
  images: Array<string>;
}

export const ImageCarousel = memo(({images}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagesAmount = useMemo(() => images.length, [images.length]);
  const {width: screenWidth} = useWindowDimensions();

  return (
    <View>
      <Carousel
        loop
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={setActiveIndex}
        data={images}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        renderItem={({item: url}) => {
          return (
            <Image
              style={{width: screenWidth}}
              resizeMode="cover"
              source={url}
            />
          );
        }}
      />
      {pagesAmount > 1 && (
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeIndex}
          dotStyle={styles.dotStyle}
          dotContainerStyle={styles.dotContainerStyle}
          containerStyle={styles.paginationContainer}
          inactiveDotOpacity={0.5}
          inactiveDotScale={1}
        />
      )}
    </View>
  );
});
