import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { SearchObject } from 'core/types';
import { ITEM_HEIGHT } from '../constants';

export interface GhostItemProps {
  item: SearchObject | null;
  displayIndex: number;
  ghostAbsY: SharedValue<number>;
  ghostOffsetX: SharedValue<number>;
  ghostScale: SharedValue<number>;
  containerAbsY: number;
}

/** The "ghost" item that follows the user's finger during a drag operation. It visually represents the item being dragged, with position and styling that can be animated for smooth movement. */
export const GhostItem = ({
  item,
  displayIndex,
  ghostAbsY,
  ghostOffsetX,
  ghostScale,
  containerAbsY,
}: GhostItemProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: ghostAbsY.value - containerAbsY - ITEM_HEIGHT / 2,
    transform: [
      { translateX: ghostOffsetX.value },
      { scale: ghostScale.value },
    ],
    opacity: 0.95,
    zIndex: 999,
    elevation: 16,
  }));

  if (!item) return null;

  return (
    <Animated.View style={animatedStyle}>
      <View className="min-h-[74px] flex-row items-center px-4">
        {displayIndex === 0 ? (
          <View className="mr-3 h-[30px] w-[30px] items-center justify-center rounded-full bg-accent-light">
            <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-success">
              <Text
                className="font-body2Bold text-xs text-white"
                numberOfLines={1}>
                {displayIndex + 1}
              </Text>
            </View>
          </View>
        ) : (
          <View className="mr-3 h-5 w-5 items-center justify-center rounded-full bg-success">
            <Text
              className="font-body2Bold text-xs text-white"
              numberOfLines={1}>
              {displayIndex + 1}
            </Text>
          </View>
        )}
        <View
          className="flex-1 flex-row items-center rounded-xl bg-primary px-3 py-3 shadow-md"
          style={{ elevation: 8 }}>
          <View className="flex-1 justify-center">
            <Text className="font-body1Bold text-primary" numberOfLines={1}>
              {item.name}
            </Text>
            {item.category?.name ? (
              <Text
                className="font-body2Regular text-secondary"
                numberOfLines={1}>
                {item.category.name}
              </Text>
            ) : null}
          </View>
          <View className="items-center justify-center p-3">
            <View className="flex-row gap-[3px]">
              <View className="gap-[3px]">
                <View className="h-1 w-1 rounded-full bg-silver" />
                <View className="h-1 w-1 rounded-full bg-silver" />
                <View className="h-1 w-1 rounded-full bg-silver" />
              </View>
              <View className="gap-[3px]">
                <View className="h-1 w-1 rounded-full bg-silver" />
                <View className="h-1 w-1 rounded-full bg-silver" />
                <View className="h-1 w-1 rounded-full bg-silver" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
