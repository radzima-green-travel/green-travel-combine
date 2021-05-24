import React, {memo, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ICoordinates} from 'core/types';
import {themeStyles} from './styles';
import {useThemeStyles, useTranslation} from 'core/hooks';

interface IProps {
  title: string;
  subtitle: string;
  coordinates?: ICoordinates;
  onCoordinatesPress: (location: string) => void;
  routeLength: number | null;
  belongsToSubtitle: string | null;
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
      const stringCoordinates = coordinates?.map(number => number.toFixed(7));

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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitleText}</Text>
        {location ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCoordinatesPressHandler}>
            <Text style={styles.location}>{location}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);
