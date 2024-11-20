import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {MULTISWITCH_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  items: {id: string; value: string; disabled: boolean}[];
  onItemPress: (item: string) => void;
  testID: string;
  activeItemId: string | null;
  style?: StyleProp<ViewStyle>;
  defaultValue?: {id: string; value: string; disabled: boolean};
}

export const Multiswitch = memo(
  ({items, onItemPress, activeItemId, testID, style, defaultValue}: IProps) => {
    const multiswitchStyles = useThemeStyles(MULTISWITCH_THEMES.default);

    const switchItems = defaultValue ? [defaultValue, ...items] : items;
    const activeId = activeItemId || defaultValue?.id;

    return (
      <View
        style={[styles.container, styles.mainContainer, style]}
        {...getPlatformsTestID(testID)}>
        <View style={[styles.container, multiswitchStyles.container]}>
          {switchItems.map(item => {
            const active = item.id === activeId;

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  multiswitchStyles.nonActive,
                  active && multiswitchStyles.active,
                ]}
                key={item.id}
                disabled={item.disabled}
                onPress={() => {
                  if (item.id !== activeId) {
                    onItemPress(item.id);
                  }
                }}
                {...getPlatformsTestID(composeTestID(testID, 'item'))}>
                <Text
                  style={[
                    styles.text,
                    multiswitchStyles.nonActiveText,
                    item.disabled && multiswitchStyles.disabledText,
                    active && multiswitchStyles.activeText,
                  ]}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);
