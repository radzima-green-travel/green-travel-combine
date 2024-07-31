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
  items: {id: string; value: string}[];
  onItemPress: (item: string) => void;
  testID: string;
  activeItemId: string | null;
  style?: StyleProp<ViewStyle>;
  defaultValue?: {id: string; value: string};
}

export const Multiswitch = memo(
  ({items, onItemPress, activeItemId, testID, style, defaultValue}: IProps) => {
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
            const active = item.id === (activeItemId || defaultValue?.id);

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  multiswitchStyles.nonActive,
                  active && multiswitchStyles.active,
                ]}
                key={item.id}
                onPress={() => {
                  if (item.id !== activeItemId) {
                    onItemPress(item.id);
                  }
                }}
                {...getPlatformsTestID(composeTestID(testID, 'item'))}>
                <Text
                  style={[
                    styles.text,
                    multiswitchStyles.nonActiveText,
                    active && multiswitchStyles.activeText,
                  ]}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  },
);
