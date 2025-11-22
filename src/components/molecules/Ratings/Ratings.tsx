import React, { memo } from 'react';
import { View } from 'react-native';
import { AnimatedStar, Icon } from 'atoms';
import { map } from 'lodash';
import { createNumericArray } from 'core/helpers';
import { styles } from './styles';

interface IProps {
  rating?: number;
  points?: number;
  onChange?: (point: number) => void;
}

export const Ratings = memo(({ rating = 0, points = 5, onChange }: IProps) => {
  return (
    <View style={styles.container}>
      {onChange
        ? map(createNumericArray(points), point => (
            <AnimatedStar
              key={String(point)}
              value={point}
              onPress={onChange}
              marked={rating >= point}
            />
          ))
        : map(createNumericArray(points), point => (
            <Icon
              key={String(point)}
              name={rating >= point ? 'markedStar' : 'star'}
              size={42}
              style={styles.icon}
            />
          ))}
    </View>
  );
});
