import React, {memo} from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {ReactNode} from 'react';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

export type Props = {
  children: ReactNode;
  itemName: string;
  isSubSection?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FiltersSectionContainer = memo(
  ({children, itemName, style, isSubSection}: Props) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <View
        style={[
          isSubSection ? styles.subSectionContainer : styles.sectionContainer,
          style,
        ]}>
        <Text style={isSubSection ? styles.subSectionName : styles.sectionName}>
          {itemName}
        </Text>
        {children}
      </View>
    );
  },
);
