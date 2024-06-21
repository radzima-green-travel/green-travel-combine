import React, {memo, useState, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {MULTISWITCH_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  multiswitchItems: string[];
  testID: string;
  ref?: any;
  style?: StyleProp<ViewStyle>;
}

export const Multiswitch = memo(
  ({multiswitchItems, testID, style, ref}: IProps) => {
    const multiswitchStyles = useThemeStyles(MULTISWITCH_THEMES.default);

    const [activeIndex, setActiveIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      setActiveIndex,
      getActiveIndex: () => activeIndex,
    }));

    return (
      <View style={[styles.container, style]} {...getPlatformsTestID(testID)}>
        <View style={[styles.container, multiswitchStyles.container]}>
          {multiswitchItems.map((item, index) => {
            // TODO: temporarily. Will be removed after adding Multiswitch to the filter screen
            const active = index === activeIndex;

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  multiswitchStyles.nonActive,
                  active && multiswitchStyles.active,
                ]}
                key={index}
                onPress={() => {
                  setActiveIndex(index);
                }}
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
