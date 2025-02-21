import {ColoredWidget} from 'components/molecules';
import {Image} from 'expo-image';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

export const PlacesYouWontFindWidget = ({onPress}: {onPress?: () => void}) => {
  const {t} = useTranslation('home');

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
  const {width: windowWidth} = useWindowDimensions();

  return (
    <View
      style={[
        imageStyles.container,
        {bottom: windowWidth >= 600 ? -8 : '-5.6%'},
      ]}>
      <Image
        source={require('assets/images/globe-illustration.png')}
        contentFit="cover"
        style={imageStyles.image}
      />
    </View>
  );
});

const imageStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: `${(158 / 154) * 100}%`,
    maxWidth: 300,
    right: -11,
  },
  image: {
    width: '100%',
    aspectRatio: 158 / 86,
  },
});
