import {ICategory} from 'core/types';
import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {styles} from './styles';

const ratio = 165 / 104;
const width = (SCREEN_WIDTH * 0.88) / 2;
const height = width / ratio;
const marginRight = SCREEN_WIDTH * 0.12 * 0.26;

interface IProps {
  isOdd: boolean;
  count: number | undefined;
  item: ICategory;
  onPress: (item: ICategory) => void;
}

export const BookmarkItem = memo(({isOdd, count, onPress, item}: IProps) => {
  const onPressHandler = useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressHandler}
      style={[
        styles.box,
        {width: width, height: height},
        isOdd && {marginRight},
      ]}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.count}>{count || 0}</Text>
    </TouchableOpacity>
  );
});
