import React, {memo, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ICoordinates, TestIDs} from 'core/types';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {getPlatformsTestID} from 'core/helpers';
import {Icon} from 'atoms';

interface IProps {
  title: string;
  subtitle: string;
  coordinates?: ICoordinates;
  onCoordinatesPress: (location: string) => void;
  routeLength: number | null;
  belongsToSubtitle?: string | null;
}

export const DetailsPageCapture = memo(
  ({
    title,
    subtitle,
    coordinates,
    onCoordinatesPress,
    routeLength,
    belongsToSubtitle,
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

    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
          {...getPlatformsTestID(TestIDs.ObjectDetailsTitle)}>
          {title}
        </Text>
        {subtitleText ? (
          <Text
            style={styles.subtitle}
            {...getPlatformsTestID(TestIDs.ObjectDetailsAddress)}>
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
              {...getPlatformsTestID(TestIDs.ObjectDetailsLocation)}>
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
              {...getPlatformsTestID(TestIDs.ObjectDetailsLocation)}>
              {t('copyLocation')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);
