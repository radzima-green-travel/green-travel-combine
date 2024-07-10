import React, {memo, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Icon} from 'atoms/Icon';
import {themeStyles, gradientConfig} from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {FavoriteButtonContainer} from '../../containers';
import {useThemeStyles} from 'core/hooks';
import {Image} from 'expo-image';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

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
  testID: string;
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
    testID,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const dimensions = useMemo(() => {
      return {width, height: width / ratio};
    }, [width]);

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}
        {...getPlatformsTestID(composeTestID(testID, title))}>
        <Image
          style={styles.image as ImageStyle}
          source={imageUri}
          placeholder={blurhash}
          transition={200}
        />
        <LinearGradient {...gradientConfig} style={styles.gradient} />
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
                  width={24}
                  height={24}
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
