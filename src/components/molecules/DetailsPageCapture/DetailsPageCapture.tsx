import React, {memo, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ICoordinates} from 'core/types';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
import {Icon} from 'atoms';
import {RatingBadge} from 'molecules';

interface IProps {
  title: string;
  subtitle: string;
  coordinates?: ICoordinates;
  onCoordinatesPress: (location: string) => void;
  routeLength: number | null;
  belongsToSubtitle?: string | null;

  usersRating: number | null;
  googleRating: number | null;
  usersRatingsTotal: number | null;
  googleRatingsTotal: number | null;
  testID: string;
}

export const DetailsPageCapture = memo(
  ({
    title,
    subtitle,
    coordinates,
    onCoordinatesPress,
    routeLength,
    belongsToSubtitle,
    usersRating,
    googleRating,
    usersRatingsTotal,
    googleRatingsTotal,
    testID,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');

    const styles = useThemeStyles(themeStyles);
    const location = useMemo(() => {
      const stringCoordinates = coordinates?.map(number => number.toFixed(6));

      return stringCoordinates ? stringCoordinates.reverse().join(', ') : null;
    }, [coordinates]);

    const onCoordinatesPressHandler = useCallback(() => {
      if (location) {
        onCoordinatesPress(location);
      }
    }, [onCoordinatesPress, location]);

    const subtitleText = useMemo(() => {
      let result = subtitle || '';

      if (belongsToSubtitle && !result.includes(belongsToSubtitle)) {
        result = `${belongsToSubtitle}, ${result}`;
      }

      if (routeLength) {
        result = `${t('routeLength', {
          km: Number(routeLength.toFixed(2)),
        })}${result}`;
      }

      if (result.trim().endsWith(',')) {
        result = result.trim().slice(0, -1);
      }

      return result;
    }, [belongsToSubtitle, routeLength, subtitle, t]);

    const isRatingsExist = usersRating || googleRating;

    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
          {...getPlatformsTestID(composeTestID(testID, 'title'))}>
          {title}
        </Text>
        {isRatingsExist ? (
          <View style={styles.ratings}>
            {usersRating && usersRatingsTotal ? (
              <RatingBadge
                rating={usersRating}
                label={t('usersRating', {rating: usersRatingsTotal})}
                iconName="starSmall"
              />
            ) : null}
            {googleRating && googleRatingsTotal ? (
              <RatingBadge
                rating={googleRating}
                label={t('googleRating', {rating: googleRatingsTotal})}
                iconName="googleIconSmall"
              />
            ) : null}
          </View>
        ) : null}
        {subtitleText ? (
          <Text
            style={styles.subtitle}
            {...getPlatformsTestID(composeTestID(testID, 'address'))}>
            {subtitleText}
          </Text>
        ) : null}
        {location ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.locationContainer}
            onPress={onCoordinatesPressHandler}>
            <Text
              style={styles.location}
              {...getPlatformsTestID(composeTestID(testID, 'location'))}>
              {location}
            </Text>
            <Icon
              style={styles.copyIcon}
              color="red"
              name="contentCopy"
              size={16}
            />

            <Text
              style={[styles.location, styles.copyLocation]}
              {...getPlatformsTestID(composeTestID(testID, 'copyLocation'))}>
              {t('copyLocation')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);
