import {ColoredWidget} from 'molecules';
import {Image} from 'expo-image';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {widgetStyles} from './styles';

export const RandomSpotWidget = ({onPress}: {onPress?: () => void}) => {
  const {t} = useTranslation('home');

  return (
    <ColoredWidget
      testID="randomSpotWidget"
      title={t('randomSpotWidgetTitle')}
      titleAlignment="right"
      backgroundColor="#D7E9FF"
      titleColor="#2462EC"
      titleBadgeColor="#3A81F7"
      backdropSlot={<BackdropImage />}
      onPress={onPress}
    />
  );
};

export const BackdropImage = memo(() => {
  return (
    <View style={widgetStyles.container}>
      <Image
        source={require('assets/images/dice-illustration.png')}
        contentFit="cover"
        style={widgetStyles.image}
      />
    </View>
  );
});
