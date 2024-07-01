import React from 'react';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {ReactNode} from 'react';
import {themeStyles} from '../../styles';
import {useThemeStyles, useTranslation} from 'core/hooks';

export type Props = {
  children: ReactNode;
  itemName: string;
  style?: StyleProp<ViewStyle>;
};

export const LineItemContainer = ({children, itemName, style}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  return (
    <View style={[styles.lineItemContainer, style]}>
      <Text style={styles.lineItemName}>{t(itemName)}</Text>
      {children}
    </View>
  );
};
