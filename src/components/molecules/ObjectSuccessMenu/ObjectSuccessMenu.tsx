import React, { memo, useMemo } from 'react';
import { View, Text, StyleProp, ImageStyle } from 'react-native';
import { ButtonsGroup } from '../ButtonsGroup';
import { composeTestID, getPlatformsTestID } from 'core/helpers';
import { useThemeStyles } from 'core/hooks';
import { themeStyles } from './styles';

import { Image } from 'expo-image';
import { images } from 'assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  testID: string;
  onPress: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
  imageAsset: keyof typeof images;
  imageStyle?: StyleProp<ImageStyle>;
}

export const ObjectSuccessMenu = memo(
  ({
    testID,
    onPress,
    title,
    subtitle,
    buttonText,
    imageAsset,
    imageStyle,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const buttons = useMemo(() => {
      return [
        {
          onPress: onPress,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'gotItButton'),
          text: buttonText,
        },
      ];
    }, [buttonText, onPress, testID]);
    const { bottom } = useSafeAreaInsets();

    return (
      <View {...getPlatformsTestID(testID)} style={styles.container}>
        <Image
          {...getPlatformsTestID(composeTestID(testID, 'image'))}
          source={images[imageAsset]}
          style={[styles.image as StyleProp<ImageStyle>, imageStyle]}
        />
        <Text
          {...getPlatformsTestID(composeTestID(testID, 'title'))}
          style={styles.title}>
          {title}
        </Text>
        <Text
          {...getPlatformsTestID(composeTestID(testID, 'subtitle'))}
          style={styles.subtitle}>
          {subtitle}
        </Text>
        <ButtonsGroup
          bottomInset={bottom}
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
