import React, {useEffect, useCallback, useMemo, useState, memo} from 'react';

import {styles} from './styles';

import {Animated, View} from 'react-native';
import {AnimatedDot} from './components';
import {DOT_OFFSET, PAGES_AMOUNT_WITHOUT_ANIMATION} from './constants';

interface IProps {
  currentPage: number;
  pagesAmount: number;
}

DOT_OFFSET;
export const Pager = memo(({currentPage, pagesAmount}: IProps) => {
  const [pivotIndex, setPivotIndex] = useState(0);
  const pageIndex = currentPage - 1;
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const isAnimated = pagesAmount > PAGES_AMOUNT_WITHOUT_ANIMATION;

  const translateX = useMemo(() => {
    return isAnimated
      ? animatedValue.interpolate({
          inputRange: [0, pagesAmount - 1],
          outputRange: [
            DOT_OFFSET * 2,
            -((pagesAmount - 1) * DOT_OFFSET - DOT_OFFSET * 3),
          ],
        })
      : 0;
  }, [isAnimated, animatedValue, pagesAmount]);

  const pages = Array.from({length: pagesAmount});

  const animate = useCallback(
    toValue => {
      Animated.timing(animatedValue, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    [animatedValue],
  );

  useEffect(() => {
    if (isAnimated) {
      if (pageIndex < pivotIndex) {
        animate(pageIndex);
        setPivotIndex(prev => prev - 1);
      } else if (pageIndex > pivotIndex + 2) {
        animate(pageIndex - 2);
        setPivotIndex(prev => prev + 1);
      }
    }
  }, [animate, pageIndex, pivotIndex, isAnimated]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dotsContainer,
          {
            transform: [
              {
                translateX: translateX,
              },
            ],
          },
        ]}>
        {pages.map((_p, index) => (
          <AnimatedDot
            key={index}
            isActive={pageIndex === index}
            pivotIndex={pivotIndex}
            index={index}
            animated={isAnimated}
          />
        ))}
      </Animated.View>
    </View>
  );
});
