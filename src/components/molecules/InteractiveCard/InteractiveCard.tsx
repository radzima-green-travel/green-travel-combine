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
import {FavoriteButtonContainer} from 'containers';
import {useThemeStyles} from 'core/hooks';
import {Image} from 'expo-image';
import {composeTestID} from 'core/helpers';
import {INTERACTIVE_CARD_RATIO} from 'core/constants';

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
  blurhash: string | null;
  testID: string;
}

export const InteractiveCard = memo(
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
      return {width, height: width / INTERACTIVE_CARD_RATIO};
    }, [width]);
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={[styles.cardContainer, containerStyle, dimensions]}
        accessible={false}
        testID={testID}>
        <Image
          style={styles.image as ImageStyle}
          source={imageUri}
          placeholder={{blurhash: blurhash || undefined}}
          cachePolicy="memory-disk"
          transition={100}
        />
        <LinearGradient {...gradientConfig} style={styles.gradient} />
        <View style={styles.cardContentContainer}>
          <Text testID={composeTestID(testID, 'title')} style={styles.title}>
            {title}
          </Text>
          {isFavoriteBlockVisible ? (
            <FavoriteButtonContainer
              testID={composeTestID(testID, 'favoriteButton')}
              onFavoriteToggle={onFavoriteChanged}
              removeWithAnimation={removeFavoriteWithAnimation}
              onAnimationEnd={onRemoveAnimationEnd}
              objectId={id}>
              {isFavorite => (
                <Icon
                  testID={composeTestID(testID, 'favoriteIcon')}
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
