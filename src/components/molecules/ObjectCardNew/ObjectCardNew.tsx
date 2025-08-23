import {Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {Image, ImageStyle} from 'expo-image';
import React, {memo, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {RatingBadge} from '../RatingBadge';
import {objectCardStyles} from './styles';
import {FavoriteButtonContainer} from 'components/containers';
import {CardItem} from 'core/types';
export interface ObjectCardNewProps<T> {
  testID: string;
  item: T;
  id: CardItem['id'];
  name: CardItem['name'];
  categoryName?: CardItem['categoryName'];
  cover: CardItem['cover'];
  blurhash: CardItem['blurhash'];
  usersRating?: CardItem['usersRating'];
  googleRating?: CardItem['googleRating'];
  onPress: (data: T) => void;
  onFavoriteChanged?: (item: T, nextIsFavorite: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const Component = <T,>({
  testID,
  item,
  name,
  categoryName,
  cover,
  blurhash,
  usersRating,
  googleRating,
  id,
  onFavoriteChanged,
  onPress,
  style,
}: ObjectCardNewProps<T>) => {
  const styles = useThemeStyles(objectCardStyles);

  const onPressHandler = () => onPress(item);

  const onFavoriteChangedHandler = useCallback(
    (nextIsFavorite: boolean) => {
      onFavoriteChanged?.(item, nextIsFavorite);
    },
    [item, onFavoriteChanged],
  );

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      testID={testID}
      activeOpacity={0.8}
      accessible={false}
      style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image
          testID={composeTestID(testID, 'image')}
          source={cover}
          placeholder={{blurhash: blurhash ?? undefined}}
          style={styles.image as ImageStyle}
        />
        <FavoriteButtonContainer
          testID={composeTestID(testID, 'favoriteButton')}
          onFavoriteToggle={onFavoriteChangedHandler}
          style={styles.favoriteToggleButton}
          loadingIndicatorColor={
            (styles.favoriteIcon as TextStyle).color as string
          }
          objectId={id}>
          {isFavorite => {
            return (
              <Icon
                testID={composeTestID(testID, 'favoriteIcon')}
                name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                width={18}
                height={18}
                style={styles.favoriteIcon}
              />
            );
          }}
        </FavoriteButtonContainer>

        <View style={styles.ratingRow}>
          {!!usersRating && (
            <RatingBadge
              testID={composeTestID(testID, 'userRating')}
              rating={usersRating}
              size="small"
              iconName="starSmall"
            />
          )}
          {!!googleRating && (
            <RatingBadge
              testID={composeTestID(testID, 'googleRating')}
              rating={googleRating}
              size="small"
              iconName="google"
            />
          )}
        </View>
      </View>
      <View style={styles.detailsBlock}>
        <Text
          testID={composeTestID(testID, 'name')}
          style={styles.name}
          numberOfLines={2}>
          {name}
        </Text>
        <Text
          testID={composeTestID(testID, 'categoryName')}
          style={styles.category}>
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ObjectCardNew = memo(Component) as typeof Component;
