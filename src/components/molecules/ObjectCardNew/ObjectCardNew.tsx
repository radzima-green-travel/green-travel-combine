import {Icon} from 'atoms';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {Image, ImageStyle} from 'expo-image';
import {isUndefined} from 'lodash';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {RatingBadge} from '../RatingBadge';
import {objectCardStyles} from './styles';

export interface ObjectCardNewProps {
  testID: string;
  name: string;
  categoryName: string;
  imageUrl: string;
  imageBlurhash: string | null;
  userRating?: number;
  googleRating?: number;
}

export const ObjectCardNew = memo(
  ({
    testID,
    name,
    categoryName,
    imageUrl,
    imageBlurhash,
    userRating,
    googleRating,
  }: ObjectCardNewProps) => {
    const styles = useThemeStyles(objectCardStyles);

    return (
      <View testID={testID} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            testID={composeTestID(testID, 'image')}
            source={imageUrl}
            placeholder={{blurhash: imageBlurhash ?? undefined}}
            // TODO: Improve types of useThemeStyles
            style={styles.image as ImageStyle}
          />
          <View
            testID={composeTestID(testID, 'favoriteButton')}
            style={styles.favoriteToggleButton}>
            <Icon
              testID={composeTestID(testID, 'favoriteIcon')}
              name={'bookmark'}
              width={18}
              height={18}
              style={styles.favoriteIcon}
            />
          </View>
        </View>
        <View style={styles.detailsBlock}>
          <View style={styles.ratingRow}>
            {!isUndefined(userRating) && (
              <RatingBadge
                testID={composeTestID(testID, 'userRating')}
                rating={userRating}
                size="small"
                iconName="starSmall"
              />
            )}
            {!isUndefined(googleRating) && (
              <RatingBadge
                testID={composeTestID(testID, 'googleRating')}
                rating={googleRating}
                size="small"
                iconName="google"
              />
            )}
          </View>
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
      </View>
    );
  },
);
