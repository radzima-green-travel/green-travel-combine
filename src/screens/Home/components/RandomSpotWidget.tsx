import {ColoredWidget} from 'components/molecules';
import {Image} from 'expo-image';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

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
    <View style={imageStyles.container}>
      <Image
        source={require('assets/images/dice-illustration.png')}
        contentFit="cover"
        style={imageStyles.image}
      />
    </View>
  );
});

const imageStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: `${(150 / 154) * 100}%`,
    maxWidth: 300,
    left: -8,
    bottom: -5,
  },
  image: {
    width: '100%',
    aspectRatio: 150 / 121,
  },
});
