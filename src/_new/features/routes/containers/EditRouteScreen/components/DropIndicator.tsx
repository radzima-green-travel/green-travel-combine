import React from 'react';
import { View } from 'react-native';
import { ITEM_HEIGHT, LIST_PADDING_TOP } from '../constants';

interface DropIndicatorProps {
  insertAt: number;
}

/** Visual indicator showing where a dragged item will be dropped in the list. Positioned absolutely based on the current insert index. */
export const DropIndicator = ({ insertAt }: DropIndicatorProps) => (
  <View
    pointerEvents="none"
    className="absolute right-0 left-0 z-[998] flex-row items-center px-11"
    style={{
      top: LIST_PADDING_TOP + insertAt * ITEM_HEIGHT - LIST_PADDING_TOP / 2,
    }}>
    <View className="h-2 w-2 rounded-full bg-success" />
    <View className="h-0.5 flex-1 bg-success" />
  </View>
);
