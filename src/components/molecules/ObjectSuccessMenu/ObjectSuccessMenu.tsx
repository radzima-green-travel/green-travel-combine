import React, {memo, useMemo} from 'react';
import {View, Text, StyleProp, ImageStyle} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';
import {useColorScheme, useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';

import {Image} from 'expo-image';

interface IProps {
  testID: string;
  onPress: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
}

export const ObjectSuccessMenu = memo(
  ({testID, onPress, title, subtitle, buttonText}: IProps) => {
    const theme = useColorScheme();
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

    return (
      <View testID={testID} style={styles.container}>
        <Image
          source={
            theme === 'light'
              ? require('assets/images/imageRatingLight.png')
              : require('assets/images/imageRatingDark.png')
          }
          style={styles.image as StyleProp<ImageStyle>}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <ButtonsGroup
          withBottomInset
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
