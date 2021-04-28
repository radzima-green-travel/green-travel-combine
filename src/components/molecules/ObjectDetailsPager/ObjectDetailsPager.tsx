import {Pager} from '../../atoms/ImageSlider/components';
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
      <Pager currentPage={page} pagesAmount={pagesAmount} />
    </View>
  );
});
