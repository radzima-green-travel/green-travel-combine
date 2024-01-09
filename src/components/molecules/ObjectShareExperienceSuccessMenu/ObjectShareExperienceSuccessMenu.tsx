import React, {memo, useMemo} from 'react';
import {View, Text, StyleProp, ImageStyle} from 'react-native';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';
import {useColorScheme, useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';

import {Image} from 'expo-image';

interface IProps {
  testID: string;
  onGotItPress: () => void;
}

export const ObjectShareExperienceSuccessMenu = memo(
  ({testID, onGotItPress}: IProps) => {
    const theme = useColorScheme();
    const styles = useThemeStyles(themeStyles);
    const {t} = useTranslation('objectDetails');

    const buttons = useMemo(() => {
      return [
        {
          onPress: onGotItPress,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'gotItButton'),
          text: t('gotIt'),
        },
      ];
    }, [onGotItPress, t, testID]);

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
        <Text style={styles.title}>{t('shareExperienceSuccessTitle')}</Text>
        <Text style={styles.subtitle}>
          {t('shareExperienceSuccessSubtitle')}
        </Text>
        <ButtonsGroup
          withBottomInset
          containerStyle={styles.buttonsContainer}
          buttons={buttons}
        />
      </View>
    );
  },
);
