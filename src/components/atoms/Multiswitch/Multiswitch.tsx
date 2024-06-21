import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {MULTISWITCH_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  multiswitchItems: string[];
  onItemPress: () => void;
  testID: string;
  activeItem?: string;
  style?: StyleProp<ViewStyle>;
}

export const Multiswitch = memo(
  ({
    multiswitchItems,
    onItemPress,
    activeItem = multiswitchItems[0],
    testID,
    style,
  }: IProps) => {
    const multiswitchStyles = useThemeStyles(MULTISWITCH_THEMES.default);

    return (
      <View style={[styles.container, style]} {...getPlatformsTestID(testID)}>
        <View style={[styles.container, multiswitchStyles.container]}>
          {multiswitchItems.map((item, index) => {
            const active = item === activeItem;

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  multiswitchStyles.nonActive,
                  active && multiswitchStyles.active,
                ]}
                key={index}
                onPress={onItemPress}
                {...getPlatformsTestID(composeTestID(testID, 'item'))}>
                <Text
                  style={[
                    styles.text,
                    multiswitchStyles.nonActiveText,
                    active && multiswitchStyles.activeText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);
