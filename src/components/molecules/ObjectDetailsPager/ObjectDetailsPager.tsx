import {NumPager} from 'atoms';
import React, {memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface IProps {
  pagesAmount: number;
  page: number;
}

export const ObjectDetailsPager = memo(({pagesAmount, page}: IProps) => {
  return (
    <View style={styles.pagerContainer}>
      <NumPager currentPage={page} pagesAmount={pagesAmount} />
    </View>
  );
});
