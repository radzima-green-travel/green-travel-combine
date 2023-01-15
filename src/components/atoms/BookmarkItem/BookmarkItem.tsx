import {useThemeStyles} from 'core/hooks';
import {IBookmarkItem} from 'core/types';
import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {themeStyles} from './styles';

const ratio = 165 / 104;
const width = (SCREEN_WIDTH * 0.88) / 2;
const height = width / ratio;
const marginRight = SCREEN_WIDTH * 0.12 * 0.26;

const paddingHorizontal = (SCREEN_WIDTH - width * 2 - marginRight) / 2;

interface IProps {
  isOdd: boolean;
  isLast: boolean;
  count: number | undefined;
  item: IBookmarkItem;
  onPress: (item: IBookmarkItem) => void;
  testID?: string;
}

export const BookmarkItem = memo(
  ({isOdd, isLast, count, onPress, item, testID}: IProps) => {
    const onPressHandler = useCallback(() => {
      onPress(item);
    }, [item, onPress]);
    const styles = useThemeStyles(themeStyles);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressHandler}
        style={[
          styles.box,
          {width: width, height: height},
          isOdd && {marginRight: isLast ? width + marginRight : marginRight},
        ]}
        testID={testID}>
        <Text style={styles.text}>{item.categoryName}</Text>
        <Text style={styles.count}>{count || 0}</Text>
      </TouchableOpacity>
    );
  },
);

// @ts-ignore
BookmarkItem.paddingHorizontal = paddingHorizontal;
