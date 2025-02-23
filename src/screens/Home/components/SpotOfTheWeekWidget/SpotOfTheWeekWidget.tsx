import {HighlightedText} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {CardItem} from 'core/types';
import {ObjectCardNew} from 'molecules';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useWindowDimensions, View} from 'react-native';
import {Extrapolation, interpolate} from 'react-native-reanimated';
import {widgetStyles} from './styles';

interface SpotOfTheWeekWidgetProps {
  object: CardItem;
}

export const SpotOfTheWeekWidget = memo(
  ({object}: SpotOfTheWeekWidgetProps) => {
    const {t} = useTranslation('home');
    const styles = useThemeStyles(widgetStyles);

    const {width: windowWidth} = useWindowDimensions();

    const maxFontSizeMultiplier = interpolate(
      windowWidth,
      [365, 375, 430, 500],
      [1.0, 1.1, 1.4, 1.7],
      Extrapolation.CLAMP,
    );

    return (
      <View style={styles.container}>
        <HighlightedText
          testID="spotOfTheWeekWidgetTitle"
          textWithMarkup
          style={styles.title}
          boldTextStyle={styles.hightlightedText}
          maxFontSizeMultiplier={maxFontSizeMultiplier}>
          {t('spotOfTheWeekWidgetTitle')}
        </HighlightedText>
        <ObjectCardNew
          testID="spotOfTheWeekWidget"
          name={object.name}
          imageUrl={object.cover}
          imageBlurhash={object.blurhash}
          categoryName="National parks"
          userRating={4.9}
          googleRating={4.5}
        />
      </View>
    );
  },
);
