import React from 'react';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useThemeStyles } from 'core/hooks';
import { themeStyles } from './styles';
import { PADDING_HORIZONTAL } from 'core/constants';

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
  const { top } = useSafeAreaInsets();

  const styles = useThemeStyles(themeStyles);

  const { headerTitleAlign } = options || {};

  const headerCentered = headerTitleAlign === 'center';

  const headerLeftBlock = (() => {
    const headerLeftElement = options?.headerLeft?.({
      canGoBack: Boolean(back),
      label: '',
      tintColor: '',
    });

    return headerLeftElement && headerCentered ? (
      <View style={styles.expanded}>{headerLeftElement}</View>
    ) : (
      headerLeftElement
    );
  })();

  const headerRightBlock = (() => {
    const headerRightElement = options?.headerRight?.({
      canGoBack: Boolean(back),
      tintColor: '',
    });

    return headerRightElement && headerCentered ? (
      <View style={styles.expanded}>{headerRightElement}</View>
    ) : (
      headerRightElement
    );
  })();

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
      <View
        style={StyleSheet.compose(
          styles.headerTitleContainer,
          headerCentered && styles.alignCenter,
        )}>
        {title}
      </View>
    ) : null;
  };

  const topOffset = Platform.select({
    ios: options?.presentation === 'modal' ? 0 : top,
    android: top,
    default: 0,
  });

  return (
    <View
      style={[
        styles.container,
        withOverlay && styles.overlay,
        {
          paddingTop: topOffset + PADDING_HORIZONTAL,
        },
        style,
        options?.headerStyle,
      ]}>
      {contentAbove && contentAbove()}
      <View style={styles.mainContentContainer}>
        {headerLeftBlock}
        {headerTitle()}
        {headerRightBlock}
        {headerLeftBlock && !headerRightBlock && headerCentered && (
          <View style={styles.expanded} />
        )}
      </View>

      {contentBelow && contentBelow()}
    </View>
  );
};
