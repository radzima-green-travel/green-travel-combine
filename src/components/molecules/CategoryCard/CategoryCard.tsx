import {Card} from 'atoms';
import {ITransformedCategory} from 'core/types';
import React, {memo, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  data: ITransformedCategory;
  onPress: (item: ITransformedCategory) => void;
  width: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CategoryCard = memo(
  ({data, width, onPress, containerStyle}: IProps) => {
    const {name, cover} = data;

    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);

    return (
      <Card
        containerStyle={containerStyle}
        width={width}
        onPress={onPressHandler}
        title={name}
        imageUri={cover || undefined}
        isCat
      />
    );
  },
);
