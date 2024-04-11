import React, {memo, useMemo} from 'react';
import {View, Text, StyleProp, ImageStyle} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

import {Image} from 'expo-image';
import {images} from 'assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  testID: string;
  onPress: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
  imageAsset: keyof typeof images;
}

export const ObjectSuccessMenu = memo(
  ({testID, onPress, title, subtitle, buttonText, imageAsset}: IProps) => {
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
    const {bottom} = useSafeAreaInsets();

    return (
      <View testID={testID} style={styles.container}>
        <Image
          source={images[imageAsset]}
          style={styles.image as StyleProp<ImageStyle>}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <ButtonsGroup
          bottomInset={bottom}
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
