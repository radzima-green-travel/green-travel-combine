import {Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {Image, ImageStyle} from 'expo-image';
import React, {memo, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {RatingBadge} from '../RatingBadge';
import {objectCardStyles} from './styles';
import {FavoriteButtonContainer} from 'components/containers';
import {CardItem} from 'core/types';
export interface ObjectCardNewProps {
  testID: string;
  data: CardItem;
  onPress: (data: CardItem) => void;
  onFavoriteChanged?: (item: CardItem, nextIsFavorite: boolean) => void;
}

export const ObjectCardNew = memo(
  ({testID, data, onFavoriteChanged, onPress}: ObjectCardNewProps) => {
    const styles = useThemeStyles(objectCardStyles);
    const {name, categoryName, cover, blurhash, usersRating, googleRating, id} =
      data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    const onFavoriteChangedHandler = useCallback(
      (nextIsFavorite: boolean) => {
        onFavoriteChanged?.(data, nextIsFavorite);
      },
      [data, onFavoriteChanged],
    );
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        testID={testID}
        activeOpacity={0.8}
        style={styles.container}>
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
            objectId={id}>
            {isFavorite => {
              return (
                <View style={styles.favoriteToggleButton}>
                  <Icon
                    testID={composeTestID(testID, 'favoriteIcon')}
                    name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                    width={18}
                    height={18}
                    style={styles.favoriteIcon}
                  />
                </View>
              );
            }}
          </FavoriteButtonContainer>

          <View style={styles.ratingRow}>
            {usersRating && (
              <RatingBadge
                testID={composeTestID(testID, 'userRating')}
                rating={usersRating}
                size="small"
                iconName="starSmall"
              />
            )}
            {googleRating && (
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
  },
);
