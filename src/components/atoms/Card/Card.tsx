import React, {memo, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles, gradientConfig} from './styles';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {FavoriteButtonContainer} from '../../containers';
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
  onFavoriteChanged?: (nextIsFavorite: boolean) => void;
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
    onFavoriteChanged,
  }: IProps) => {
    const isImageProvided = Boolean(imageUri);
    const styles = useThemeStyles(themeStyles);
    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    const normalizedSource = useMemo(() => {
      return normaliseSource({
        uri: imageUri,
      });
    }, [imageUri]);

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}>
        <FastImage
          style={(styles.image as unknown) as StyleProp<ImageStyle>}
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
              onFavoriteToggle={onFavoriteChanged}
              removeWithAnimation={removeFavoriteWithAnimation}
              onAnimationEnd={onRemoveAnimationEnd}
              objectId={id}>
              {isFavorite => (
                <Icon
                  name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                  width={20}
                  height={20}
                  style={[
                    styles.icon,
                    isImageProvided ? {} : styles.emptyCardIcon,
                  ]}
                />
              )}
            </FavoriteButtonContainer>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);
