import React, {memo, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles, gradientConfig} from './styles';
import FastImage from 'react-native-fast-image';
import {COLORS} from 'assets';
import LinearGradient from 'react-native-linear-gradient';
import {FavoriteButtonContainer} from '../../containers';
import {imagesService} from 'services/ImagesService';
import {useThemeStyles} from 'core/hooks';
export const ratio = 324 / 144;

interface IProps {
  imageUri?: string;
  title: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  width: number;
  isFavoriteBlockVisible?: boolean;
  id?: string;
  removeFavoriteWithAnimation?: boolean;
  onRemoveAnimationEnd?: () => void;
}

const normaliseSource = source => {
  const normalisedSource =
    source && typeof source.uri === 'string' && !source.uri.split('http')[1]
      ? null
      : source;
  return source && source.uri ? normalisedSource : source;
};

export const Card = memo(
  ({
    imageUri,
    title,
    containerStyle,
    onPress,
    width,
    id,
    isFavoriteBlockVisible = false,
    removeFavoriteWithAnimation,
    onRemoveAnimationEnd,
  }: IProps) => {
    const isImageProvided = Boolean(imageUri);
    const styles = useThemeStyles(themeStyles);
    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    const normalizedSource = useMemo(() => {
      return normaliseSource({
        uri: imageUri ? imagesService.getOriginalImage(imageUri) : undefined,
      });
    }, [imageUri]);

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}>
        <FastImage
          style={styles.image}
          source={normalizedSource}
          onError={() => {}}
        />
        {isImageProvided ? (
          <LinearGradient {...gradientConfig} style={styles.gradient} />
        ) : null}
        <View style={styles.cardContentContainer}>
          <Text
            style={[styles.title, !isImageProvided && styles.emptyCardTitle]}>
            {title}
          </Text>
          {isFavoriteBlockVisible ? (
            <FavoriteButtonContainer
              removeWithAnimation={removeFavoriteWithAnimation}
              onAnimationEnd={onRemoveAnimationEnd}
              objectId={id}>
              {isFavorite => (
                <Icon
                  name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                  width={20}
                  height={20}
                  color={isImageProvided ? COLORS.white : COLORS.logCabin}
                />
              )}
            </FavoriteButtonContainer>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);
