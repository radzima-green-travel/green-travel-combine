import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, PanResponder } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  LinearTransition,
} from 'react-native-reanimated';
import { Checkbox } from 'atoms';
import type { SearchObject } from 'core/types';
import { ITEM_HEIGHT } from '../constants';

export const connectorDots = Array.from({ length: 20 }, (_, i) => (
  <View key={i} className="mb-1 h-1 w-0.5 rounded-[1px] bg-alto" />
));

export interface DraggableItemProps {
  item: SearchObject;
  displayIndex: number;
  totalItems: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDragStart: (id: string, absoluteY: number) => void;
  onDragMove: (absoluteY: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

/** Represents a draggable item in the route editing list. Handles touch gestures for dragging and dropping, as well as selection. */
export const DraggableItem = ({
  item,
  displayIndex,
  totalItems,
  isSelected,
  onToggleSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
  isDragging,
}: DraggableItemProps) => {
  const cbRef = useRef({ onDragStart, onDragMove, onDragEnd, itemId: item.id });
  cbRef.current = { onDragStart, onDragMove, onDragEnd, itemId: item.id };

  const handleTouchedRef = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => handleTouchedRef.current,
      onMoveShouldSetPanResponder: () => handleTouchedRef.current,
      onPanResponderGrant: e => {
        cbRef.current.onDragStart(cbRef.current.itemId, e.nativeEvent.pageY);
      },
      onPanResponderMove: e => {
        cbRef.current.onDragMove(e.nativeEvent.pageY);
      },
      onPanResponderRelease: () => {
        handleTouchedRef.current = false;
        cbRef.current.onDragEnd();
      },
      onPanResponderTerminate: () => {
        handleTouchedRef.current = false;
        cbRef.current.onDragEnd();
      },
    }),
  ).current;

  const itemHeight = useSharedValue(ITEM_HEIGHT);
  useEffect(() => {
    itemHeight.value = withTiming(isDragging ? 0 : ITEM_HEIGHT, {
      duration: 150,
    });
  }, [isDragging, itemHeight]);

  const heightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    overflow: 'hidden',
  }));

  const isFirst = displayIndex === 0;
  const isLast = displayIndex === totalItems - 1;

  return (
    <Animated.View
      layout={LinearTransition.duration(150)}
      style={heightStyle}
      {...panResponder.panHandlers}>
      <View className="h-[74px] flex-row items-stretch px-4">
        {/* Left indicator: line + circle + line */}
        <View className="relative mr-3 w-8 items-center justify-center">
          {!isFirst && (
            <View className="absolute top-0 bottom-1/2 w-0.5 items-center justify-end overflow-hidden">
              {connectorDots}
            </View>
          )}
          {!isLast && (
            <View className="absolute top-1/2 bottom-0 w-0.5 items-center justify-start overflow-hidden">
              {connectorDots}
            </View>
          )}
          {isFirst ? (
            <View className="h-[30px] w-[30px] items-center justify-center rounded-full bg-accent-light">
              <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-success">
                <Text
                  className="font-body2Bold text-xs text-white"
                  numberOfLines={1}>
                  {displayIndex + 1}
                </Text>
              </View>
            </View>
          ) : (
            <View className="h-5 w-5 items-center justify-center rounded-full bg-success">
              <Text
                className="font-body2Bold text-xs text-white"
                numberOfLines={1}>
                {displayIndex + 1}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleSelect(item.id)}
          className="my-1 flex-1 flex-row items-center rounded-xl bg-primary px-3 py-3 shadow-sm"
          style={{ elevation: 2 }}>
          <Checkbox
            testID={`editRouteCheckbox-${item.id}`}
            checked={isSelected}
            onPress={() => onToggleSelect(item.id)}
          />
          <View className="ml-3 flex-1 justify-center">
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
          <View
            className="items-center justify-center p-3"
            onTouchStart={() => {
              handleTouchedRef.current = true;
            }}>
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
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
