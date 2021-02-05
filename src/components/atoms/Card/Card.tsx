import React, {memo, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {Icon} from 'atoms';
import {styles, gradientConfig} from './styles';
import FastImage from 'react-native-fast-image';
import {COLORS} from 'assets';
import LinearGradient from 'react-native-linear-gradient';

const ratio = 324 / 144;

interface IProps {
  imageUri?: string;
  title: string;
  isFavorite?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  onIsFavoritePress?: () => void;
  width: number;
}

const normaliseSource = (source) => {
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
    isFavorite,
    containerStyle,
    onPress,
    onIsFavoritePress,
    width,
  }: IProps) => {
    const isFavoriteBlockVisible = typeof isFavorite === 'boolean';
    const isImageProvided = Boolean(imageUri);

    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    const normalizedSource = useMemo(() => {
      return normaliseSource({uri: imageUri});
    }, [imageUri]);

    return (
      <TouchableOpacity
        onPress={onPress}
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
            <TouchableOpacity
              onPress={onIsFavoritePress}
              hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
              activeOpacity={0.8}>
              <Icon
                name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                width={20}
                height={20}
                color={isImageProvided ? COLORS.white : COLORS.logCabin}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);
