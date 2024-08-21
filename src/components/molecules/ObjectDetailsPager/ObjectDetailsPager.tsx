import {NumPager} from 'atoms';
import React, {memo} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface IProps {
  pagesAmount: number;
  page: number;
  testID: string;
}

export const ObjectDetailsPager = memo(
  ({pagesAmount, page, testID}: IProps) => {
    return (
      <View style={styles.pagerContainer}>
        <NumPager
          testID={testID}
          currentPage={page}
          pagesAmount={pagesAmount}
        />
      </View>
    );
  },
);
