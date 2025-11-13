import { ColoredWidget } from 'molecules';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { widgetStyles } from './styles';

export const PlacesYouWontFindWidget = ({
  onPress,
}: {
  onPress?: () => void;
}) => {
  const { t } = useTranslation('home');

  return (
    <ColoredWidget
      testID="placesYouWontFindWidget"
      title={t('placesYouWontFindWidgetTitle')}
      backgroundColor="#CFE9BC"
      titleColor="#3B6526"
      titleBadgeColor="#82C15A"
      backdropSlot={<BackdropImage />}
      onPress={onPress}
    />
  );
};

const BackdropImage = memo(() => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View
      style={[
        widgetStyles.container,
        { bottom: windowWidth >= 600 ? -8 : '-5.6%' },
      ]}>
      <Image
        source={require('assets/images/globe-illustration.png')}
        contentFit="cover"
        style={widgetStyles.image}
      />
    </View>
  );
});
