import React, {memo, useMemo, useCallback} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ICoordinates} from 'core/types';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  title: string;
  subtitle: string;
  coordinates?: ICoordinates;
  onCoordinatesPress: (location: string) => void;
}

export const DetailsPageCapture = memo(
  ({title, subtitle, coordinates, onCoordinatesPress}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const location = useMemo(() => {
      const stringCoordinates = coordinates?.map((number) => number.toFixed(7));

      return stringCoordinates ? stringCoordinates.reverse().join(', ') : null;
    }, [coordinates]);

    const onCoordinatesPressHandler = useCallback(() => {
      if (location) {
        onCoordinatesPress(location);
      }
    }, [onCoordinatesPress, location]);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
