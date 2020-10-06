import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {styles} from './styles';

const ratio = 165 / 104;
const width = (SCREEN_WIDTH * 0.88) / 2;
const height = width / ratio;
const marginRight = SCREEN_WIDTH * 0.12 * 0.26;

interface IProps {
  text: string;
  isOdd: boolean;
  count: number;
  onPress: () => {};
}

export const BookmarkItem = memo(({text, isOdd, count, onPress}: IProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.box,
        {width: width, height: height},
        isOdd && {marginRight},
      ]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.count}>{count || 0}</Text>
    </TouchableOpacity>
  );
});
