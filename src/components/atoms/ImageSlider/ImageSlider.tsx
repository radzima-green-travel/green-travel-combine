import React, {memo, useState, useCallback} from 'react';
import {Pager} from './components';
import {View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';

import {SCREEN_WIDTH} from 'services/PlatformService';
import {styles} from './styles';
import {Icon} from '../Icon';
import {COLORS} from 'assets';
interface IProps {
  images?: string[];
}

export const ImageSlider = memo(({images}: IProps) => {
  const pagesAmount = images?.length;
  const [page, setPage] = useState(1);

  const onScroll = useCallback(
    e => {
      if (pagesAmount && pagesAmount > 1) {
        const {contentOffset} = e.nativeEvent;
        const pageNum = Math.round(contentOffset.x / SCREEN_WIDTH);
        setPage(pageNum + 1);
      }
    },
    [pagesAmount],
  );

  return pagesAmount ? (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={128}
        bounces={false}
        keyExtractor={(_item, index) => String(index)}
        onScroll={onScroll}
        data={images}
        renderItem={({item, index}) => {
          return (
            <FastImage
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: item,
                priority:
                  index === 0
                    ? FastImage.priority.high
                    : FastImage.priority.low,
              }}
            />
          );
        }}
      />
      <View style={styles.pagerContainer}>
        <Pager currentPage={page} pagesAmount={pagesAmount} />
      </View>
    </View>
  ) : (
    <View style={styles.emptyContatiner}>
      <Icon color={COLORS.boulder} name="camera" width={70} height={70} />
    </View>
  );
});
