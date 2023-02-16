import React, {memo, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Icon} from 'atoms';
import {themeStyles, gradientConfig} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {FavoriteButtonContainer} from '../../containers';
import {useThemeStyles} from 'core/hooks';
import {Image} from 'expo-image';
import {useState} from 'react';
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
  blurhash?: string;
}

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
    blurhash,
  }: IProps) => {
    const [isImageProvided, setIsImageProvided] = useState(false);
    const styles = useThemeStyles(themeStyles);
    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    const onLoadHandler = useCallback(() => {
      setIsImageProvided(true);
    }, []);

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}>
        <Image
          style={styles.image as ImageStyle}
          source={imageUri}
          onLoad={onLoadHandler}
          placeholder={blurhash}
        />
        {isImageProvided ? (
          <LinearGradient {...gradientConfig} style={styles.gradient} />
        ) : null}
        <View style={styles.cardContentContainer}>
          <Text style={styles.title}>{title}</Text>
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
                  style={[styles.icon]}
                />
              )}
            </FavoriteButtonContainer>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  },
);
