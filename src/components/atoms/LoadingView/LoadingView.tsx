import React, {memo} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {COLORS} from 'assets';

type Props = {
  transparent?: boolean;
  size?: number | 'small' | 'large';
};

export const LoadingView = memo<Props>(
  ({transparent = true, size = 'large'}: Props) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <View
        style={[styles.loadingContainer, transparent && styles.transparent]}>
        <ActivityIndicator color={COLORS.forestGreen} size={size} />
      </View>
    );
  },
);
