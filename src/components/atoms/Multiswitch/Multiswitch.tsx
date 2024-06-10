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
  style?: StyleProp<ViewStyle>;
}

export const Multiswitch = memo(
  ({multiswitchItems, onItemPress, testID, style}: IProps) => {
    const multiswitchStyles = useThemeStyles(MULTISWITCH_THEMES.default);

    return (
      <View style={[styles.container, style]} {...getPlatformsTestID(testID)}>
        <View style={[styles.container, multiswitchStyles.container]}>
          {multiswitchItems.map((item, index) => {
            // TODO: temporarily. Will be removed after adding Multiswitch to the filter screen
            const active = index === 0;

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
