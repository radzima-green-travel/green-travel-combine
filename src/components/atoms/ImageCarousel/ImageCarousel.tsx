import React, {memo, useMemo, useCallback, useState} from 'react';
import {View, FlatList, Image, useWindowDimensions} from 'react-native';
import {styles} from './styles';

interface Props {
  images: Array<number>;
}

export const ImageCarousel = memo(({images}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesAmount = useMemo(() => images.length, [images.length]);
  const {width: screenWidth} = useWindowDimensions();

  const onScroll = useCallback(
    (e) => {
      if (pagesAmount > 1) {
        const {contentOffset} = e.nativeEvent;
        const pageNum = Math.round(contentOffset.x / screenWidth);
        setCurrentPage(pageNum + 1);
      }
    },
    [pagesAmount, screenWidth],
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={128}
        bounces={false}
        keyExtractor={(url, index) => String(index)}
        onScroll={onScroll}
        data={images}
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
        <View style={styles.paginationContainer}>
          {Array.from({length: pagesAmount}).map((_el, pageIndex) => {
            const isActivePage = pageIndex + 1 === currentPage;
            return (
              <View
                style={[
                  styles.paginationMark,
                  isActivePage && styles.paginationMarkActive,
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
});
