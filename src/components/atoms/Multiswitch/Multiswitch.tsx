import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {MULTISWITCH_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  items: {key: string; label: string}[];
  onItemPress: (item: string) => void;
  testID: string;
  activeItemKey: string | null;
  style?: StyleProp<ViewStyle>;
  defaultValue?: {key: string; label: string};
}

export const Multiswitch = memo(
  ({
    items,
    onItemPress,
    activeItemKey,
    testID,
    style,
    defaultValue,
  }: IProps) => {
    const multiswitchStyles = useThemeStyles(MULTISWITCH_THEMES.default);

    const switchItems = defaultValue ? [defaultValue, ...items] : items;

    return (
      <View
        style={[styles.container, styles.mainContainer, style]}
        {...getPlatformsTestID(testID)}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            multiswitchStyles.container,
          ]}
          horizontal>
          {switchItems.map(item => {
            const active = item.key === (activeItemKey || defaultValue?.key);

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  multiswitchStyles.nonActive,
                  active && multiswitchStyles.active,
                ]}
                key={item.key}
                onPress={() => onItemPress(item.key)}
                {...getPlatformsTestID(composeTestID(testID, 'item'))}>
                <Text
                  style={[
                    styles.text,
                    multiswitchStyles.nonActiveText,
                    active && multiswitchStyles.activeText,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  },
);
