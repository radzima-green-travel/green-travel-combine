import React, {memo} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

type Props = {
  transparent?: boolean;
};

export const LoadingView = memo<Props>(({transparent = true}: Props) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={[styles.loadingContainer, transparent && styles.transparent]}>
      <ActivityIndicator size="large" />
    </View>
  );
});
