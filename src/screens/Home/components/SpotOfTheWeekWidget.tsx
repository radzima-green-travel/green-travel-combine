import {COLORS, FONTS_PRESETS} from 'assets';
import {ObjectCardNew} from 'components/molecules';
import {createThemeStyles} from 'core/helpers/styles';
import {useThemeStyles} from 'core/hooks';
import {CardItem} from 'core/types';
import React from 'react';
import {Trans} from 'react-i18next';
import {Text, useWindowDimensions, View} from 'react-native';
import {Extrapolation, interpolate} from 'react-native-reanimated';
import {TextProps} from 'react-native-svg';

interface SpotOfTheWeekWidgetProps {
  object: CardItem;
}

export const SpotOfTheWeekWidget = ({object}: SpotOfTheWeekWidgetProps) => {
  const styles = useThemeStyles(widgetStyles);

  return (
    <View style={styles.container}>
      <Trans
        testID="spotOfTheWeekWidgetTitle"
        parent={TitleText}
        ns="home"
        i18nKey="spotOfTheWeekWidgetTitle"
        style={styles.title}
        components={{
          highlight: <Text style={styles.hightlightedText} />,
        }}
      />
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
};

const TitleText = (props: TextProps) => {
  const {width: windowWidth} = useWindowDimensions();

  const maxFontSizeMultiplier = interpolate(
    windowWidth,
    [365, 375, 430, 500],
    [1.0, 1.1, 1.4, 1.7],
    Extrapolation.CLAMP,
  );

  return <Text {...props} maxFontSizeMultiplier={maxFontSizeMultiplier} />;
};

const widgetStyles = createThemeStyles({
  container: {flex: 1},
  title: {
    ...FONTS_PRESETS.headlineBold,
    color: {
      light: COLORS.light.text.primary,
      dark: COLORS.dark.text.primary,
    },
    marginBottom: 8,
  },
  hightlightedText: {
    color: {
      light: COLORS.light.text.link,
      dark: COLORS.dark.text.link,
    },
  },
});
