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
  onPress: (data: CardItem) => void;
  onFavoriteChanged?: (item: CardItem, nextIsFavorite: boolean) => void;
}

export const SpotOfTheWeekWidget = memo(
  ({object, onPress, onFavoriteChanged}: SpotOfTheWeekWidgetProps) => {
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
          onPress={onPress}
          testID="spotOfTheWeekWidget"
          data={object}
          onFavoriteChanged={onFavoriteChanged}
        />
      </View>
    );
  },
);
