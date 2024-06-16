import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {ReactNode} from 'react';
import {themeStyles} from '../../styles';
import {useThemeStyles, useTranslation} from 'core/hooks';

export type Props = {
  children: ReactNode;
  filterName: string;
};

export const FilterContainer = memo(({children, filterName}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterName}>{t(filterName)}</Text>
      {children}
    </View>
  );
});
