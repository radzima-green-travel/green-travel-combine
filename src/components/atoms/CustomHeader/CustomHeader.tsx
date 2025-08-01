import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleProp, ViewStyle, Text} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {PADDING_HORIZONTAL} from 'core/constants';

interface CustomHeaderProps extends Partial<NativeStackHeaderProps> {
  contentAbove?: () => React.ReactNode;
  contentBelow?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  withOverlay?: boolean;
}

export const CustomHeader = ({
  options,
  back,
  contentAbove,
  contentBelow,
  style,
  withOverlay = true,
}: CustomHeaderProps) => {
  const {top} = useSafeAreaInsets();

  const styles = useThemeStyles(themeStyles);

  const headerLeft = () => {
    const headerLeftElement = options?.headerLeft?.({
      canGoBack: Boolean(back),
      label: '',
      tintColor: '',
    });

    return headerLeftElement ? headerLeftElement : null;
  };

  const headerRight = () => {
    const headerRightElement = options?.headerRight?.({
      canGoBack: Boolean(back),
      tintColor: '',
    });

    return headerRightElement ? headerRightElement : null;
  };

  const headerTitle = () => {
    const title =
      typeof options?.headerTitle === 'function' ? (
        options.headerTitle?.({
          children: options.title || '',
          tintColor: '',
        })
      ) : (
        <Text>{options?.headerTitle}</Text>
      );

    return title ? (
      <View style={styles.headerTitleContainer}>{title}</View>
    ) : null;
  };

  return (
    <View
      style={[
        styles.container,
        withOverlay && styles.overlay,
        {
          paddingTop: top + PADDING_HORIZONTAL,
        },
        style,
        options?.headerStyle,
      ]}>
      {contentAbove && contentAbove()}
      <View style={styles.mainContentContainer}>
        {headerLeft()}
        {headerTitle()}
        {headerRight()}
      </View>

      {contentBelow && contentBelow()}
    </View>
  );
};
